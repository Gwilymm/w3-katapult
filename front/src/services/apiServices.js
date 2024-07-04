import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';


const apiService = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});

export class ApiService {
    static async signUp(user) {
        const response = await apiService.post('/auth/register', user);
        useAuthStore().setToken("token", response.data.token);
        return response
    }
    static async login(user) {
        try {
            const response = await apiService.post('/auth/login', user);
            // console.log('Logged in', response.data);
            useAuthStore().setToken("token", response.data.token);
            return response.data;
        } catch (error) {
            console.error('Failed to login', error);
            throw error;
        }
    }
}

