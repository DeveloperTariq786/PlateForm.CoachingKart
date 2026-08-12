// Base API version
const API_VERSION = '/api/v1';

// Authentication Endpoints

export const AUTH_ENDPOINTS = {
    LOGIN: `${API_VERSION}/auth/login`,
    LOGOUT: `${API_VERSION}/auth/logout`,
    FORGOT_PASSWORD: `${API_VERSION}/auth/forgot-password`,
    RESET_PASSWORD: `${API_VERSION}/auth/reset-password`,
} as const;


export const PLATFORM_ENDPOINTS = {
    ADMIN: {
        USERS: `${API_VERSION}/platform/admin/users`,
        INSTITUTIONS: `${API_VERSION}/platform/admin/institutions`,
        INSTITUTIONS_SUSPEND: `${API_VERSION}/platform/admin/institutions/suspend`,
        INSTITUTIONS_REACTIVATE: `${API_VERSION}/platform/admin/institutions/reactivate`,
        MEDIA_CAROUSEL: `${API_VERSION}/platform/admin/media/carousel`,
        MEDIA_ADS: `${API_VERSION}/platform/admin/media/ads`,
        MEDIA_OFFERS: `${API_VERSION}/platform/admin/media/offers`,
    },
} as const;

export const ENDPOINTS = {
    AUTH: AUTH_ENDPOINTS,
    PLATFORM: PLATFORM_ENDPOINTS,
} as const;

export default ENDPOINTS;
