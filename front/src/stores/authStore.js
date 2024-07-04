import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token
    },
    actions: {
        setToken(newToken) {
            this.token = newToken;
        },
        clearToken() {
            this.token = null;
        }
    }
});
