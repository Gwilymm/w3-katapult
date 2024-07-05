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
      birthDate: "",
      address: "",
    },
    step2: {
      projectDescription: "",
      resume: "",
      ampleur: "",
      socialUtility: "",
      solution: "",
      difference: "",
      indicateurs: "",
    },
    step3: {
      revenus: "",
      emplois: "",
      viabilite: "",
      diversification: "",
      partenariat: "",
      autreContact: "",
      role: "",
    },
    appId: null,
    projectDetailId: null,
    economicModelId: null,
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
      this.user.id = userData.id;
      this.user.firstName = userData.firstName;
      this.user.lastName = userData.lastName;
      this.user.email = userData.email;
      this.user.phoneNumber = userData.phoneNumber;
      this.user.birthDate = userData.birthDate;
      this.user.address = userData.address;
    },
    setStep2(formData) {
      this.step2.projectDescription = formData.projectDescription;
      this.step2.resume = formData.resume;
      this.step2.ampleur = formData.ampleur;
      this.step2.socialUtility = formData.socialUtility;
      this.step2.solution = formData.solution;
      this.step2.difference = formData.difference;
      this.step2.indicateurs = formData.indicateurs;
    },
    setStep3(formData) {
      this.step3.revenus = formData.revenus;
      this.step3.emplois = formData.emplois;
      this.step3.viabilite = formData.viabilite;
      this.step3.diversification = formData.diversification;
      this.step3.partenariat = formData.partenariat;
      this.step3.autreContact = formData.autreContact;
      this.step3.role = formData.role;
    },
    setAppId(appId) {
      this.appId = appId;
    },
    setProjectDetailId(projectDetailId) {
      this.projectDetailId = projectDetailId;
    },
    setEconomicModelId(economicModelId) {
      this.economicModelId = economicModelId;
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
        birthDate: "",
        address: "",
      };
    },
    clearAppId() {
      this.appId = null;
    },
    clearProjectDetailId() {
      this.projectDetailId = null;
    },
    clearEconomicModelId() {
      this.economicModelId = null;
    },
    logout() {
      this.clearToken();
      this.clearUser();
      this.clearAppId();
      this.clearProjectDetailId();
      this.clearEconomicModelId();
    },
  },
});
