import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProtectedRoute } from "@/core/routes/ProtectedRoute";
import { ROUTES } from "./paths";
import Login from "@/pages/login/Login";
import Dashboard from "@/pages/dashboard/Dashboard";
import Institutions from "@/pages/institutions/Institutions";
import Users from "@/pages/users/Users";
import AddUser from "@/pages/users/AddUser";
import Carousel from "@/pages/media/Carousel";
import AddCarousel from "@/pages/media/AddCarousel";
import Ads from "@/pages/media/Ads";
import AddAd from "@/pages/media/AddAd";
import Offers from "@/pages/media/Offers";
import NotFound from "@/pages/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.LANDING} element={<Navigate to={ROUTES.LOGIN} replace />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.INSTITUTION} element={<Institutions />} />
          <Route path={ROUTES.ADMINS} element={<Users />} />
          <Route path={ROUTES.ADMINS_ADD} element={<AddUser />} />
          <Route path={ROUTES.MEDIA_CAROUSEL} element={<Carousel />} />
          <Route path={ROUTES.MEDIA_CAROUSEL_ADD} element={<AddCarousel />} />
          <Route path={ROUTES.MEDIA_ADS} element={<Ads />} />
          <Route path={ROUTES.MEDIA_ADS_ADD} element={<AddAd />} />
          <Route path={ROUTES.MEDIA_OFFERS} element={<Offers />} />
        </Route>
      </Route>
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}

