import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-destructive mb-4">401</h1>
        <h2 className="text-2xl font-semibold mb-2">No Autorizado</h2>
        <p className="text-muted-foreground mb-6">
          No tienes permisos para acceder a esta página.
        </p>
        <Button asChild>
          <Link href="/dashboard">
            Volver al Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
