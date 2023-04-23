import axios from 'axios';

const api = axios.create({
    baseURL: 'epicurean-backend.vercel.app'
})

export default api;