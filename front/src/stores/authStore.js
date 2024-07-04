import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        user : {
            firstName :'',
            lastName :'',
            email :'',
            phoneNumber :'',
        }
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
        getUserInfo: (state) => state.user
    },
    actions: {
        setToken(newToken) {
            this.token = newToken;
        },
        setTokenUserInfo(newUserInfo) {
            this.user = newUserInfo;
        },
        clearToken() {
            this.token = null;
        },
        logout() {
            this.clearToken();
        }
    }
});
