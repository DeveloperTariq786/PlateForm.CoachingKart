import { apiClient } from "@/core/api";
import { ENDPOINTS } from "@/core/api/endpoint/endpoints";
import { GetCarouselsResponse, CreateCarouselRequest, CreateCarouselResponse } from "../types/carousel.types";

export const carouselService = {
    getCarousels: async (): Promise<GetCarouselsResponse> => {
        const response = await apiClient.get<GetCarouselsResponse>(
            ENDPOINTS.PLATFORM.ADMIN.MEDIA_CAROUSEL
        );
        return response.data;
    },
    createCarousel: async (data: CreateCarouselRequest): Promise<CreateCarouselResponse> => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("buttonText", data.buttonText);
        formData.append("institutionId", data.institutionId);
        formData.append("image", data.image);

        const response = await apiClient.post<CreateCarouselResponse>(
            ENDPOINTS.PLATFORM.ADMIN.MEDIA_CAROUSEL,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response.data;
    },
};
