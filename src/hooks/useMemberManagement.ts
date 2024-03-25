import {useContext} from "react";
import {AppDataContext} from "../providers/AppDataProvider.tsx";
import {useMutation} from "@tanstack/react-query";
import api from "../utils/instances/axios.ts";
import {AxiosError, AxiosResponse} from "axios";


export default function useMemberManagement(){
    const {chamaData: {members, unverified}} = useContext(AppDataContext)

    const approve = useMutation({
        mutationKey: ['members'],
        mutationFn: ({userId}:{userId: string}):Promise<AxiosResponse>=>new Promise((resolve, reject)=>{
            const share = document.getElementById(`share-${userId}`) as HTMLInputElement;
            const amount = share ? parseFloat(share.value) : 0;
            if(Number.isNaN(amount) || !amount) {
                throw new Error("You have to enter valid initial shares")
            }
            api.put(`/admin/approve-member`, {
                userId: userId, initial: amount
            })
                .then(res => resolve(res))
                .catch(err => reject(err))
        }),
        onSuccess: (res => alert(res.statusText)),
        onError: ((err) => {
            const text = err instanceof AxiosError ? err.response?.statusText : err.message;
            alert(text)
        })
    })
    const reject = useMutation({
        mutationKey: ['members'],
        mutationFn: ({userId}: {userId: string}):Promise<AxiosResponse>=>new Promise((resolve, reject)=>{
            api.delete(`/admin/approve-member/${userId}`)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    })

    return {unverified, members, approve, reject}
}

