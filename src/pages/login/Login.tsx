import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { LoginForm } from "@/components/common/LoginForm";
import { ROUTES } from "@/core/routes/paths";
import useAuthStore from "@/modules/auth/store/auth.store";
import { authService } from "@/modules/auth/services/auth.service";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  if (!hasHydrated) {
    return null; // Don't redirect until we know the actual auth state
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authService.login({ email, password });

      if (response.success) {
        setAuth(response.data.user, response.data.token);
        toast.success(response.message || "Login successful");
        navigate(ROUTES.DASHBOARD);
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
      toast.error(errorMessage);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="rounded-2xl border border-border bg-card px-8 py-10 shadow-sm">
          {/* Logo & Title */}
          <div className="mb-8 text-center shrink-0">
            <div className="mx-auto mb-4 flex items-center justify-center transition-transform hover:scale-110">
              <img 
                src="/logo_icon.png" 
                alt="Coachingkart Logo" 
                className="h-20 w-auto object-contain" 
              />
            </div>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Welcome back!
            </h1>
            <p className="mt-1.5 text-sm font-medium text-muted-foreground/80">
              Please sign in to manage your platform
            </p>
          </div>

          <LoginForm
            email={email}
            password={password}
            remember={remember}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onRememberChange={setRemember}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © 2026 Coachingkart. All rights reserved.
        </p>
      </div>
    </div>
  );
}
