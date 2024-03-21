import {useContext} from "react";
import {AppDataContext} from "../providers/AppDataProvider.tsx";
import {useMutation} from "@tanstack/react-query";
import api from "../utils/instances/axios.ts";
import {AxiosResponse} from "axios";


export default function useMemberManagement(){
    const {chamaData: {members, unverified}} = useContext(AppDataContext)

    const approve = useMutation({
        mutationKey: ['members'],
        mutationFn: ():Promise<AxiosResponse>=>new Promise((resolve, reject)=>{
            api.post('/admin/approve-members')
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    })

    return {unverified, members, approve}
}

