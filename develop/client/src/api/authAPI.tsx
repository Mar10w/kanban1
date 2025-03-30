import axios from 'axios';

const API_URL = '/auth/login';

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(API_URL, { username, password });
        return response.data; // Contains the JWT token
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};