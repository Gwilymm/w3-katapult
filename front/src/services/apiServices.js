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
        console.log(user);
        console.log("mes couilles");
        const response = await apiService.post('/auth/register', user);
        console.log(response.data);


    }
}
