export interface OfferInstitution {
    id: string;
    name: string;
}

export interface Offer {
    id: string;
    title: string;
    description: string;
    discount: number;
    startAt: string;
    endAt: string;
    isActive: boolean;
    institutionId: string;
    createdAt: string;
    updatedAt: string;
    institution: OfferInstitution;
    remainingSeconds: number;
}

export interface GetOffersResponse {
    success: boolean;
    data: Offer[];
}

export interface UpdateOfferRequest {
    title: string;
    description: string;
    discount: number;
    startAt: string;
    endAt: string;
    isActive: boolean;
    institutionId: string;
}

export interface UpdateOfferResponse {
    success: boolean;
    message?: string;
    data: Offer;
}
