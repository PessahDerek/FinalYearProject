import axios from "axios";

const url = window.location.href.includes("local")?
    "http://localhost:5000"
    :
    "https://7e24-41-209-60-98.ngrok-free.app"

const api = axios.create({
    baseURL: `${url}/api`
})

api.interceptors.request.use((config)=>{
    config.headers.Authorization = window.localStorage.getItem("uToken");
    return config;
})

export default api;