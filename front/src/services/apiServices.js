import axios from 'axios';


const apiService = axios.create({
    baseURL: 'http://localhost:3001/api',
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
        const response = await apiService.post('/register', user.value);
        console.log(response.data);
        router.push('/profile');
  
    }
}
