import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthState, User } from '@/modules/auth/types/auth.types';

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            hasHydrated: false,
            setAuth: (user: User, token: string) =>
                set({
                    user,
                    token,
                    isAuthenticated: true,
                }),
            logout: () =>
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                }),
            setHasHydrated: (state: boolean) => {
                set({ hasHydrated: state });
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: (state) => {
                return () => {
                    state.setHasHydrated(true);
                };
            },
        }
    )
);

export default useAuthStore;
