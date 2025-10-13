"use client";

import { useEffect, useState } from "react";
import InstallIcon from "./InstallIcon";
import { InstallInstructionsModal } from "./InstallInstructionsModal";
// import { useSearchParams } from "next/navigation";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

declare global {
  interface Navigator {
    standalone?: boolean; // solo iOS
  }
}

export const InstallButton = () => {
  // const searchParams = useSearchParams();

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [isIOS, setIsIOS] = useState(false);
  const [isMacSafari, setIsMacSafari] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(ua);
    const macSafari = /macintosh/.test(ua) && /safari/.test(ua) && !/chrome|chromium|edg/.test(ua);

    setIsIOS(ios);
    setIsMacSafari(macSafari);

    const isIOSStandalone = () => navigator.standalone === true;
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches || isIOSStandalone();

    if (isStandalone) return; // si ya está instalada, no mostrar nada

    // Android / Windows / Chrome
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };
    window.addEventListener("beforeinstallprompt", handler as EventListener);

    // iOS / macOS Safari: mostrar botón siempre
    if (ios || macSafari) {
      setShowButton(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler as EventListener);
  }, []);

  // --- FORZAR MODAL PARA TEST ---
  // useEffect(() => {
  //   const forceInstall = searchParams.get("forceInstall");
  //   if (forceInstall === "ios") {
  //     setShowModal(true);
  //     setShowButton(false);
  //   }
  // }, [searchParams]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log("Install outcome:", outcome);
      setShowButton(false);
      setDeferredPrompt(null);
    } else if (isIOS || isMacSafari) {
      setShowModal(true);
    }
  };

  if (!showButton && !showModal) return null;

  return (
    <>
      {showButton && <InstallIcon onClick={handleInstallClick} />}
      {showModal && <InstallInstructionsModal onClose={() => setShowModal(false)} />}
    </>
  );
};
