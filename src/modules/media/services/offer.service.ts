import { apiClient } from "@/core/api";
import { ENDPOINTS } from "@/core/api/endpoint/endpoints";
import { GetOffersResponse, UpdateOfferRequest, UpdateOfferResponse } from "../types/offer.types";

export const offerService = {
    getOffers: async (): Promise<GetOffersResponse> => {
        const response = await apiClient.get<GetOffersResponse>(
            ENDPOINTS.PLATFORM.ADMIN.MEDIA_OFFERS
        );
        return response.data;
    },
    updateOffer: async (data: UpdateOfferRequest): Promise<UpdateOfferResponse> => {
        const response = await apiClient.post<UpdateOfferResponse>(
            ENDPOINTS.PLATFORM.ADMIN.MEDIA_OFFERS,
            data
        );
        return response.data;
    },
};
