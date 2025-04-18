import axios from 'axios';

// Verifica se a variável de ambiente está definida, se não, usa o valor local (para desenvolvimento)
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
});

export default api;
