export type PlatformRole = 'PLATFORM_SUPER_ADMIN' | 'PLATFORM_ADMIN';

export interface User {
    id: string;
    name: string;
    email: string;
    platformRole: PlatformRole;
    isActive: boolean;
    createdAt: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        context: string;
        token: string;
    };
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    hasHydrated: boolean;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
    setHasHydrated: (state: boolean) => void;
}
