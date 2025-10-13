"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { config } from "@/lib/config";
import { PUBLIC_API } from "@/lib/publicApi/config";
import { CLIENT_API } from "@/lib/clientApi/config";
import { User, LoginRequest, LoginResponse, AuthContextType, isCompanyUser } from "@/types/auth";
import { CompanyConfigData } from "@/types/company";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const apiClient = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [companyConfig, setCompanyConfig] = useState<CompanyConfigData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchCompanyConfig = async () => {
    try {
      const configResponse = await apiClient.get(CLIENT_API.COMPANY_CONFIG);
      if (configResponse.data) {
        setCompanyConfig(configResponse.data);
      }
    } catch (err: any) {
      console.error("Error obteniendo configuración de empresa:", err);
      setCompanyConfig(null);
    }
  };

  const refreshCompanyConfig = async () => {
    await fetchCompanyConfig();
  };

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const profileResponse = await apiClient.get(PUBLIC_API.PROFILE);
      
      if (profileResponse.data && profileResponse.data.user_id) {
        setUser(profileResponse.data);
        
        if (isCompanyUser(profileResponse.data)) {
          await fetchCompanyConfig();
        }
      } else {
        setUser(null);
      }
    } catch (err: any) {
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        try {
          const refreshResponse = await apiClient.get(PUBLIC_API.REFRESH);
        
          if (refreshResponse.data.success) {
            await new Promise(resolve => setTimeout(resolve, 200));
          
            try {
              const profileResponse = await apiClient.get(PUBLIC_API.PROFILE);
            
              if (profileResponse.data && profileResponse.data.user_id) {
                setUser(profileResponse.data);
                
                if (isCompanyUser(profileResponse.data)) {
                  await fetchCompanyConfig();
                }
              } else {
                setUser(null);
              }
            } catch (profileError: any) {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        } catch (refreshErr: any) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const loginData: LoginRequest = { email, password };
      const loginResponse = await apiClient.post(PUBLIC_API.LOGIN, loginData);

      if (loginResponse.data.success) {
        const profileResponse = await apiClient.get(PUBLIC_API.PROFILE);
        
        if (profileResponse.data && profileResponse.data.user_id) {
          setUser(profileResponse.data);
          
          if (isCompanyUser(profileResponse.data)) {
            await fetchCompanyConfig();
          }
          
          await new Promise(resolve => setTimeout(resolve, 100));
          router.push("/dashboard");
        } else {
          throw new Error("No se pudieron obtener los datos del usuario");
        }
      } else {
        throw new Error(loginResponse.data.message || "Error al iniciar sesión");
      }
    } catch (err: any) {
      let errorMessage = "Error al iniciar sesión";
      
      if (err.message === "Network Error" || !err.response) {
        errorMessage = "No se pudo conectar con el servidor. Verifica tu conexión.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.status === 401) {
        errorMessage = "Credenciales incorrectas";
      } else if (err.response?.status === 500) {
        errorMessage = "Error del servidor. Intenta más tarde.";
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.get(PUBLIC_API.LOGOUT);
      setUser(null);
      setCompanyConfig(null);
      setError(null);
      router.push("/login");
    } catch (err: any) {
      setUser(null);
      setCompanyConfig(null);
      setError(null);
      router.push("/login");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    companyConfig,
    login,
    logout,
    refreshCompanyConfig,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
