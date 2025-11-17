"use client";

import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/components/auth/login-form";
import { LoginLayout } from "@/components/auth/login-layout";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { AuthRedirect } from "@/components/auth/auth-redirect";

export default function LoginPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen message="Verificando sesión..." />;
  }

  if (user) {
    return <AuthRedirect />;
  }

  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
}
