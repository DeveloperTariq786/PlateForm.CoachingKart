import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/modules/auth/store/auth.store";
import { ROUTES } from "@/core/routes/paths";

export const ProtectedRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const hasHydrated = useAuthStore((state) => state.hasHydrated);

    if (!hasHydrated) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return <Outlet />;
};
