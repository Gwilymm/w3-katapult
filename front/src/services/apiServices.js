import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';


const apiService = axios.create({
    baseURL: 'https://antoine.bauchot.caen.mds-project.fr/api',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});

export class ApiService {
    static async signUp(user) {
        console.log(user);
        const response = await apiService.post('/auth/register', user);
        console.log(response.data);
    }
    static async login(user) {
        try {
            const response = await apiService.post('/auth/login', user);
            console.log('Logged in', response.data);
            useAuthStore().setToken(response.data.token);
            return response.data;
        } catch (error) {
            console.error('Failed to login', error);
            throw error;
        }
    }
}

