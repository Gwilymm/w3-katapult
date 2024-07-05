import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

const apiService = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export class ApiService {
  static async signUp(user) {
    const response = await apiService.post("/auth/register", user);
    useAuthStore().setToken("token", response.data.token);
    return response;
  }
  static async login(user) {
    try {
      const response = await apiService.post("/auth/login", user);
      useAuthStore().setToken("token", response.data.token);
      return response.data;
    } catch (error) {
      console.error("Failed to login", error);
      throw error;
    }
  }
  static async createApp(userId) {
    try {
      let year = new Date().getFullYear();
      const response = await apiService.post("/application/", {
        userId: userId,
        applicationYear: year,
      });
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
  static async getApp(userId) {
    try {
      const response = await apiService.get(`/application/${userId}`);
      return response;
    } catch (e) {
      console.error(e);
    }
  }
  static async createProjectDetails(applicationId, details = null) {
    try {
      const response = await apiService.post("/projectdetails/", {
        applicationId: applicationId,
        genesis: details?.projectDescription | "",
        summary: details?.resume | "",
        problemAddressed: details?.ampleur | "",
        beneficiaries: details?.socialUtility | "",
        offer: details?.solution | "",
        differentiation: details?.difference | "",
        socialImpactIndicators: details?.indicateurs | "",
      });
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  static async getProjectDetails(applicationId) {
    try {
      const response = await apiService.get(
        `/projectdetails/application/${applicationId}`
      );
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  static async updateProjectDetails(projectId, applicationId, details) {
    try {
      const response = await apiService.put(`/projectdetails/${projectId}`, {
        applicationId: applicationId,
        genesis: details.projectDescription,
        summary: details.resume,
        problemAddressed: details.ampleur,
        beneficiaries: details.socialUtility,
        offer: details.solution,
        differentiation: details.difference,
        socialImpactIndicators: details.indicateurs,
      });
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  static async createEconomicModel(applicationId, details = null) {
    try {
      const response = await apiService.post("/economicmodel/", {
        applicationId: applicationId,
        revenueSources: details?.revenus | "",
        jobCreation: details?.emplois | "",
        economicViability: details?.viabilite | "",
        diversificationProjects: details?.diversification | "",
        partnerships: details?.partenariat | "",
        partnershipsResearch: details?.autreContact | "",
        stakeholderRoles: details?.role | "",
      });
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  static async getEconomicModel(applicationId) {
    try {
      const response = await apiService.get(
        `/economicmodel/application/${applicationId}`
      );
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
  static async updateEconomicModel(economicId, applicationId, details) {
    try {
      const response = await apiService.put(`/economicmodel/${economicId}`, {
        applicationId: applicationId,
        revenueSources: details.revenus,
        jobCreation: details.emplois,
        economicViability: details.viabilite,
        diversificationProjects: details.diversification,
        partnerships: details.partenariat,
        partnershipsResearch: details.autreContact,
        stakeholderRoles: details.role,
      });
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
}
