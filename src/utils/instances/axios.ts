import axios, {AxiosError} from "axios";

const url = window.location.href.includes("local")?
    "http://localhost:5000"
    :
    "https://0ee7-41-209-60-98.ngrok-free.app"

const api = axios.create({
    baseURL: `${url}/api`,
    withCredentials: true
})

api.interceptors.request.use((config)=>{
    config.headers.Authorization = window.localStorage.getItem("uToken");
    return config;
})
api.interceptors.response.use((config) => {
    return config;
}, (error: AxiosError)=>{
    // in case user is blocked
    const denied = error.response?.headers['denied_admission']
    if(denied){
        // log them out
        delete error.response?.headers['denied_admission']
        setTimeout(()=>localStorage.removeItem("uToken"), 5000);
    }
    return Promise.reject(error)
})

export default api;