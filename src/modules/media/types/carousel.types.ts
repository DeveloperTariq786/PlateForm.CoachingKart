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
    institutionId?: string | null;
    createdAt: string;
    updatedAt: string;
    institution?: CarouselInstitution | null;
}

export interface GetCarouselsResponse {
    success: boolean;
    data: Carousel[];
}

export interface CreateCarouselRequest {
    title: string;
    description: string;
    buttonText: string;
    institutionId?: string;
    image: File;
}

export interface CreateCarouselResponse {
    success: boolean;
    message?: string;
    data: Carousel;
}

export interface UpdateCarouselRequest {
    title?: string;
    description?: string;
    buttonText?: string;
    institutionId?: string;
    image?: File | null;
}

export interface UpdateCarouselResponse {
    success: boolean;
    message?: string;
    data?: Carousel | Record<string, unknown>;
}

export interface DeleteCarouselResponse {
    success: boolean;
    message?: string;
}
