import axios from 'axios';

const api = axios.create({
    baseURL: 'https://epicurean-backend.vercel.app/api'
})

export default api;