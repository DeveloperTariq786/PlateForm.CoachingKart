import { ROUTES } from "./paths";
import Index from "@/pages/Index";

import Institutions from "@/pages/institutions/Institutions";
import Users from "@/pages/users/Users";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/login/Login";
import Dashboard from "@/pages/dashboard/Dashboard";

export interface RouteConfig {
    path: string;
    element: JSX.Element;
    title?: string;
    protected?: boolean;
}

export const APP_ROUTES: RouteConfig[] = [
    { path: ROUTES.LANDING, element: <Index />, title: "Home" },
    { path: ROUTES.LOGIN, element: <Login />, title: "Login" },
    { path: ROUTES.DASHBOARD, element: <Dashboard />, title: "Dashboard", protected: true },
    { path: ROUTES.INSTITUTION, element: <Institutions />, title: "Institutions", protected: true },
    { path: ROUTES.ADMINS, element: <Users />, title: "Users", protected: true },
    { path: ROUTES.NOT_FOUND, element: <NotFound /> },
];
