import {AuthResponse, LoginDetails, SignupDetails} from "../../../vite-env";
import api from "../../instances/axios.ts";
import {AxiosError, AxiosResponse} from "axios";


export const handleSignup = (details: SignupDetails): Promise<AxiosResponse<AuthResponse>> => {
    return new Promise((resolve, reject)=>{
        try{
            resolve(api.post("/auth/signup", details))
        } catch (e) {
            reject(e as AxiosError)
        }
    })
}
export const handleLogin = (details: LoginDetails): Promise<AxiosResponse<AuthResponse>> => {
    return new Promise((resolve, reject)=>{
        try{
            resolve(api.post("/auth/login", details))
        } catch (e) {
            reject(e as AxiosError)
        }
    })
}

