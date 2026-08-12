export interface CarouselInstitution {
    id: string;
    name: string;
}

export interface Carousel {
    id: string;
    title: string;
    description: string;
    buttonText: string;
    image: string;
    institutionId: string;
    createdAt: string;
    updatedAt: string;
    institution: CarouselInstitution;
}

export interface GetCarouselsResponse {
    success: boolean;
    data: Carousel[];
}

export interface CreateCarouselRequest {
    title: string;
    description: string;
    buttonText: string;
    institutionId: string;
    image: File;
}

export interface CreateCarouselResponse {
    success: boolean;
    message?: string;
    data: Carousel;
}
