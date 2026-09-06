import { apiClient } from "@/core/api";
import { ENDPOINTS } from "@/core/api/endpoint/endpoints";
import {
    GetCarouselsResponse,
    CreateCarouselRequest,
    CreateCarouselResponse,
    UpdateCarouselRequest,
    UpdateCarouselResponse,
    DeleteCarouselResponse,
} from "../types/carousel.types";

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
        if (data.institutionId) {
            formData.append("institutionId", data.institutionId);
        }
        formData.append("image", data.image);

        const response = await apiClient.post<CreateCarouselResponse>(
            ENDPOINTS.PLATFORM.ADMIN.MEDIA_CAROUSEL,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response.data;
    },
    updateCarousel: async (id: string, data: UpdateCarouselRequest): Promise<UpdateCarouselResponse> => {
        const formData = new FormData();
        if (data.title !== undefined) formData.append("title", data.title);
        if (data.description !== undefined) formData.append("description", data.description);
        if (data.buttonText !== undefined) formData.append("buttonText", data.buttonText);
        if (data.institutionId !== undefined) {
            formData.append("institutionId", data.institutionId);
        }
        if (data.image) {
            formData.append("image", data.image);
        }

        const response = await apiClient.put<UpdateCarouselResponse>(
            `${ENDPOINTS.PLATFORM.ADMIN.MEDIA_CAROUSEL}/${id}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response.data;
    },
    deleteCarousel: async (id: string): Promise<DeleteCarouselResponse> => {
        const response = await apiClient.delete<DeleteCarouselResponse>(
            `${ENDPOINTS.PLATFORM.ADMIN.MEDIA_CAROUSEL}/${id}`
        );
        return response.data;
    },
};
