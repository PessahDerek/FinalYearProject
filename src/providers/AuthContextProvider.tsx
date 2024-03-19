import React, {createContext, useEffect, useMemo, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {handleLogin, handleSignup} from "../utils/functions/auth/auth";
import {UserProfile, AuthContextObj, AuthResponse, } from "../vite-env";
import {AxiosError, AxiosResponse} from "axios";

const defaultUser: UserProfile = {
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
}

export const AuthContext = createContext<AuthContextObj>({
    isSigningIn: false,
    profile: defaultUser,
    loggedIn: false,
    signIn: async ()=>new Promise(()=>({profile: defaultUser, message: "", token: ""})),
    signup: async ()=>new Promise(()=>({profile: defaultUser, message: "", token: ""})),
})

export default function AuthContextProvider({children}:{children: React.ReactNode}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileString, setProfileString] = useState<null|string>();

    const userProfile = useMemo(()=>{
        try {
            const profile = profileString ? JSON.parse(profileString) : defaultUser;
            if (profile satisfies UserProfile) return profile as UserProfile;
            return defaultUser;
        } catch (e) {
            console.log(profileString)
            localStorage.removeItem('uToken')
            return defaultUser;
        }
    }, [profileString])

    const handleAuthSuccess = ({data}: AxiosResponse<AuthResponse>) => {
        if(!data.profile || !data.token) return alert("Invalid response!")
        // save token in localStorage
        localStorage.setItem("uToken", data.token)
        // update as logged in
        setIsLoggedIn(true)
        //update profile
        console.log("Profile is: ")
        const profile = JSON.stringify(data.profile)
        localStorage.setItem("utProfile", profile)
        setProfileString(profile)
    }

    const signup = useMutation({
        mutationKey: ['auth'],
        mutationFn: handleSignup,
        onSuccess: handleAuthSuccess,
        onError: (err: AxiosError)=>alert(err.response?.statusText)
    })
    const login = useMutation({
        mutationKey: ['auth'],
        mutationFn:handleLogin,
        onSuccess: handleAuthSuccess,
        onError: (err: AxiosError)=>alert(err.response?.statusText)
    })

    useEffect(()=>{ // update profile string
        // update is logged in
        if(!isLoggedIn) {

            setIsLoggedIn(!!localStorage.getItem("uToken"))
            setProfileString(localStorage.getItem("utProfile"))
        }
    }, [isLoggedIn, profileString])

    return (
        <AuthContext.Provider value={{
            signup: signup.mutate,
            signIn: login.mutate,
            loggedIn: isLoggedIn,
            profile: userProfile,
            isSigningIn: signup.isPending || login.isPending
        }} >
            {children}
        </AuthContext.Provider>
    )

}

