"use client";

import { useAuth } from "@/context/AuthContext";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { AuthRedirect } from "@/components/auth/auth-redirect";

export default function Home() {
  const { isLoading } = useAuth();

  return (
    <>
      <AuthRedirect />
      {isLoading && <LoadingScreen message="Cargando..." />}
    </>
  );
}
