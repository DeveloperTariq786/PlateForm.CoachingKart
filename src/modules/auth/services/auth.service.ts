import { apiClient } from "@/core/api";
import { AUTH_ENDPOINTS } from "@/core/api/endpoint/endpoints";
import { LoginResponse } from "../types/auth.types";

export const authService = {
    login: async (credentials: Record<string, string>): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
        return response.data;
    },
};
