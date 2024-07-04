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
    step2 : {
      projectDescription:'',
      resume:'',
      ampleur:'',
      socialUtility:'',
      solution:'',
      difference:'',
      indicateurs:''
    },
    appId:null,
    projectDetailId:null
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
      this.user.address = userData.address
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
    setAppId(appId) {
      this.appId = appId
    },
    setProjectDetailId(projectDetailId){
      this.projectDetailId = projectDetailId
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
    clearAppId(){
      this.appId = null
    },
    clearProjectDetailId(){
      this.projectDetailId = null
    },
    logout() {
      this.clearToken();
      this.clearUser();
      this.clearAppId();
      this.clearProjectDetailId();
    },
  },
});
