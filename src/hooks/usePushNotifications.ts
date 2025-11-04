"use client";

import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { CLIENT_API } from '@/lib/clientApi/config';
import { SUPER_API } from '@/lib/superApi/config';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/types/auth';

function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray.buffer;
}

export function usePushNotifications() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();


  const getApiConfig = (currentUser?: User | null) => {
    const userRole = currentUser?.user_role || user?.user_role;
    return userRole === 'superadmin' ? SUPER_API : CLIENT_API;
  };

  const checkSupport = useCallback(() => {
    const supported = 'serviceWorker' in navigator &&
      'PushManager' in window &&
      'Notification' in window;
    setIsSupported(supported);
    return supported;
  }, []);

  useEffect(() => {
    const initializeNotifications = async () => {
      if (checkSupport()) {
        try {
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.getSubscription();
          setIsSubscribed(!!subscription);
        } catch (error) {
          console.error('Error checking initial subscription:', error);
          setIsSubscribed(false);
        }
      }
    };

    initializeNotifications();
  }, [checkSupport]);

  const checkSubscription = useCallback(async () => {
    if (!checkSupport()) {
      setIsSubscribed(false);
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      setIsSubscribed(!!subscription);
      return !!subscription;
    } catch (error) {
      console.error('Error checking subscription:', error);
      setIsSubscribed(false);
      return false;
    }
  }, [checkSupport]);

  const hasNotificationDecision = useCallback((userId?: string) => {
    const key = userId ? `fasttrack_notification_decision_${userId}` : 'fasttrack_notification_decision';
    const decision = localStorage.getItem(key);
    return !!decision;
  }, []);

  const getNotificationDecision = useCallback((userId?: string) => {
    const key = userId ? `fasttrack_notification_decision_${userId}` : 'fasttrack_notification_decision';
    const decision = localStorage.getItem(key);
    return decision;
  }, []);

  const getVapidPublicKey = async (currentUser?: User | null): Promise<string> => {
    try {
      const apiConfig = getApiConfig(currentUser);
      const response = await fetch(apiConfig.NOTIFICATION_GET_VAPID, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ VAPID endpoint error:', errorText);
        throw new Error(`Error obteniendo clave VAPID: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.publicKey;
    } catch (error) {
      console.error('Error obteniendo VAPID key:', error);
      throw error;
    }
  };

  const registerToken = async (subscription: PushSubscription, currentUser?: User | null): Promise<void> => {
    try {
      const apiConfig = getApiConfig(currentUser);
      const response = await fetch(apiConfig.NOTIFICATION_SUBSCRIBE, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
        }),
      });

      if (!response.ok) {
        throw new Error('Error registrando token');
      }
    } catch (error) {
      console.error('Error registrando token:', error);
      throw error;
    }
  };

  const subscribeToPush = useCallback(async (showToasts: boolean = true, _userId?: string, _userRole?: string): Promise<boolean> => {
    if (!checkSupport()) {
      if (showToasts) {
        toast.error('Las notificaciones push no están soportadas en este navegador');
      }
      return false;
    }

    const currentUser = user;

    if (!currentUser) {
      console.warn('⚠️ User not loaded yet, waiting...');
      if (showToasts) {
        toast.error('Usuario no cargado, intente nuevamente');
      }
      return false;
    }

    if (!currentUser.user_role) {
      console.warn('⚠️ User role not available');
      if (showToasts) {
        toast.error('Rol de usuario no disponible');
      }
      return false;
    }

    setIsLoading(true);

    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        if (showToasts) {
          toast.error('Permisos de notificación denegados');
        }
        return false;
      }

      const vapidPublicKey = await getVapidPublicKey(currentUser);
      const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);

      const registration = await navigator.serviceWorker.ready;

      if (!registration.active || registration.active.state !== 'activated') {
        await new Promise((resolve) => {
          const checkState = () => {
            if (registration.active?.state === 'activated') {
              resolve(true);
            } else {
              setTimeout(checkState, 100);
            }
          };
          checkState();
        });
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      });

      await registerToken(subscription, currentUser);

      if (_userId) {
        localStorage.setItem(`fasttrack_notification_decision_${_userId}`, 'accepted');
      }

      setIsSubscribed(true);
      if (showToasts) {
        toast.success('Notificaciones activadas correctamente');
      }
      return true;

    } catch (error) {
      console.error('Error suscribiéndose a push notifications:', error);
      if (showToasts) {
        toast.error('Error activando notificaciones');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [checkSupport, getVapidPublicKey, registerToken, user]);

  const unsubscribeFromPush = useCallback(async (userId?: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();

        if (userId) {
          localStorage.setItem(`fasttrack_notification_decision_${userId}`, 'declined');
        }

        try {
          const apiConfig = getApiConfig();
          await fetch(apiConfig.NOTIFICATION_UNSUBSCRIBE, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              subscription: subscription.toJSON(),
            }),
          });
        } catch (backendError) {
          console.warn('Error notificando al backend sobre desuscripción:', backendError);
        }

        setIsSubscribed(false);
        toast.success('Notificaciones desactivadas');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error desuscribiéndose:', error);
      toast.error('Error desactivando notificaciones');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [getApiConfig]);

  const unsubscribeFromAllDevices = useCallback(async (userId?: string): Promise<boolean> => {

    setIsLoading(true);

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
      }

      if (userId) {
        localStorage.setItem(`fasttrack_notification_decision_${userId}`, 'declined');
      }

      const apiConfig = getApiConfig();
      const response = await fetch(apiConfig.NOTIFICATION_UNSUBSCRIBE_ALL_DEVICES, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error cancelando notificaciones en todos los dispositivos');
      }

      setIsSubscribed(false);
      toast.success('✅ Notificaciones canceladas en todos los dispositivos');
      return true;

    } catch (error) {
      console.error('Error cancelando notificaciones:', error);
      toast.error('❌ Error cancelando notificaciones en todos los dispositivos');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [getApiConfig]);

  const clearLocalSubscription = useCallback(async (): Promise<boolean> => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
        setIsSubscribed(false);
        return true;
      }

      return true;
    } catch (error) {
      console.error('❌ Error clearing local subscription:', error);
      return false;
    }
  }, []);

  const refreshSubscriptionStatus = useCallback(async () => {
    await checkSubscription();
  }, [checkSubscription]);

  return {
    isSupported,
    isSubscribed,
    isLoading,
    checkSupport,
    checkSubscription,
    refreshSubscriptionStatus,
    subscribeToPush,
    unsubscribeFromPush,
    unsubscribeFromAllDevices,
    clearLocalSubscription,
    hasNotificationDecision,
    getNotificationDecision,
  };
}
