import { PlatformRole, User } from "@/modules/auth/types/auth.types";

export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    platformRole: PlatformRole;
}

export interface CreateUserResponse {
    success: boolean;
    message: string;
    data: User;
}

export interface GetUsersResponse {
    success: boolean;
    data: User[];
}
