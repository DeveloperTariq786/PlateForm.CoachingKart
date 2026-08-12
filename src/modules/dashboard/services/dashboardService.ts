import apiClient from "@/core/api/axios/client";
import { 
  Building2, 
  GraduationCap, 
  Layers, 
  MapPin 
} from "lucide-react";
import { ApiResponse, DashboardStatsResponse, Institution } from "../types";

export const getDashboardStats = async () => {
    const response = await apiClient.get<ApiResponse<DashboardStatsResponse>>("/api/v1/platform/admin/dashboard/stats");
    const data = response.data.data;

    return [
        {
            title: "Institutions",
            value: data.institutions || 0,
            icon: Building2,
            color: "bg-primary/10 text-primary",
        },
        {
            title: "Programs",
            value: data.programs || 0,
            icon: GraduationCap,
            color: "bg-success/10 text-success",
        },
        {
            title: "Courses",
            value: data.courses || 0,
            icon: Layers,
            color: "bg-warning/10 text-warning",
        },
        {
            title: "Centers",
            value: data.centers || 0,
            icon: MapPin,
            color: "bg-primary/10 text-primary",
        },
    ];
};

export const getRecentInstitutions = async (limit: number = 10) => {
    const response = await apiClient.get<ApiResponse<Institution[]>>(`/api/v1/platform/admin/dashboard/recent-institutions?limit=${limit}`);
    return response.data.data;
};
