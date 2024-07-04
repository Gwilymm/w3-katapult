import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    user: {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      birthDate:"",
      address:""
    },
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUserInfo: (state) => state.user,
  },
  actions: {
    setToken(newToken) {
      this.token = newToken;
    },
    setUser(userData) {
        console.log(userData)
      this.user.id = userData.id;
      this.user.firstName = userData.firstName;
      this.user.lastName = userData.lastName;
      this.user.email = userData.email;
      this.user.phoneNumber = userData.phoneNumber;
      this.user.birthDate = userData.birthDate;
      this.user.address = userData.address
    },
    clearToken() {
      this.token = null;
    },
    clearUser() {
      this.user = {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        birthDate:"",
        address:""
      };
    },
    logout() {
      this.clearToken();
    },
  },
});
