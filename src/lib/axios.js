import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_ROUTE
})

export default api;