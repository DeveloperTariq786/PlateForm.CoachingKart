export interface AdInstitution {
    id: string;
    name: string;
}

export interface Ad {
    id: string;
    image: string;
    buttonText: string;
    institutionId: string;
    createdAt: string;
    updatedAt: string;
    institution: AdInstitution;
}

export interface GetAdsResponse {
    success: boolean;
    data: Ad[];
}

export interface CreateAdRequest {
    buttonText: string;
    institutionId: string;
    image: File;
}

export interface CreateAdResponse {
    success: boolean;
    message?: string;
    data: Ad;
}
