export type InstitutionStatus = 'ACTIVE' | 'PENDING_APPROVAL' | 'REJECTED' | 'SUSPENDED';

export interface Institution {
    id: string;
    name: string;
    logo: string;
    address: string;
    owner: string;
    ownerEmail: string;
    status: InstitutionStatus;
    mail: string;
    createdAt: string;
}

export interface InstitutionDetail extends Institution {
    coverImage?: string;
    description?: string;
    location: {
        city: string;
        address: string;
        country: string;
    };
    tuitionEmail: string;
    tuitionPhone: string;
    updatedAt: string;
    courses: Array<{
        id: string;
        name: string;
        icon: string;
        color: string;
    }>;
    _count: {
        courses: number;
    };
}

export interface GetInstitutionsResponse {
    success: boolean;
    data: Institution[];
}

export interface GetInstitutionDetailResponse {
    success: boolean;
    data: InstitutionDetail;
}

export interface InstitutionFilters {
    status?: InstitutionStatus;
    id?: string;
}
