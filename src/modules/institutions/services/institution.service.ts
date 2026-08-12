import { apiClient } from "@/core/api";
import { ENDPOINTS } from "@/core/api/endpoint/endpoints";
import { GetInstitutionsResponse, InstitutionFilters, GetInstitutionDetailResponse } from "../types/institution.types";

export const institutionService = {
    getInstitutions: async (filters?: InstitutionFilters): Promise<GetInstitutionsResponse> => {
        const response = await apiClient.get<GetInstitutionsResponse>(
            ENDPOINTS.PLATFORM.ADMIN.INSTITUTIONS,
            { params: filters }
        );
        return response.data;
    },
    getInstitutionById: async (id: string): Promise<GetInstitutionDetailResponse> => {
        const response = await apiClient.get<GetInstitutionDetailResponse>(
            ENDPOINTS.PLATFORM.ADMIN.INSTITUTIONS,
            { params: { id } }
        );
        return response.data;
    },
    suspendInstitution: async (id: string) => {
        const response = await apiClient.patch(
            ENDPOINTS.PLATFORM.ADMIN.INSTITUTIONS_SUSPEND,
            {},
            { params: { id } }
        );
        return response.data;
    },
    reactivateInstitution: async (id: string) => {
        const response = await apiClient.patch(
            ENDPOINTS.PLATFORM.ADMIN.INSTITUTIONS_REACTIVATE,
            {},
            { params: { id } }
        );
        return response.data;
    },
};
