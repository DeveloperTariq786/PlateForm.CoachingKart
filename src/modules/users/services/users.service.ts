import { apiClient } from "@/core/api";
import { ENDPOINTS } from "@/core/api/endpoint/endpoints";
import { CreateUserRequest, CreateUserResponse, GetUsersResponse } from "../types/users.types";

export const userService = {
    createUser: async (data: CreateUserRequest): Promise<CreateUserResponse> => {
        const response = await apiClient.post<CreateUserResponse>(
            ENDPOINTS.PLATFORM.ADMIN.USERS,
            data
        );
        return response.data;
    },
    getAllUsers: async (): Promise<GetUsersResponse> => {
        const response = await apiClient.get<GetUsersResponse>(
            ENDPOINTS.PLATFORM.ADMIN.USERS
        );
        return response.data;
    },
};
