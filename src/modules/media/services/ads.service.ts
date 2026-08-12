import { apiClient } from "@/core/api";
import { ENDPOINTS } from "@/core/api/endpoint/endpoints";
import { GetAdsResponse, CreateAdRequest, CreateAdResponse } from "../types/ads.types";

export const adsService = {
    getAds: async (): Promise<GetAdsResponse> => {
        const response = await apiClient.get<GetAdsResponse>(
            ENDPOINTS.PLATFORM.ADMIN.MEDIA_ADS
        );
        return response.data;
    },
    createAd: async (data: CreateAdRequest): Promise<CreateAdResponse> => {
        const formData = new FormData();
        formData.append("buttonText", data.buttonText);
        formData.append("institutionId", data.institutionId);
        formData.append("image", data.image);

        const response = await apiClient.post<CreateAdResponse>(
            ENDPOINTS.PLATFORM.ADMIN.MEDIA_ADS,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response.data;
    },
};
