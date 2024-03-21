import {useContext, useEffect, useState} from "react";
import {AppDataContext} from "../providers/AppDataProvider.tsx";
import {ShareUpdate} from "../vite-env";
import {useMutation} from "@tanstack/react-query";
import api from "../utils/instances/axios.ts";
import {AxiosError, AxiosResponse} from "axios";


export default function useUpdateShares() {
    const {chamaData: {shares}} = useContext(AppDataContext);
    const [updateList, setUpdateList] = useState<ShareUpdate[]>([])

    useEffect(() => {
        const list: ShareUpdate[] = shares.map(share => ({shareId: share._id, mode: 'debit', amount: 0}))
        setUpdateList(list)
    }, [shares])

    const editAmount = (shareId: string, amount: string) => {
        const list = [...updateList].map(share => {
            if (share.shareId === shareId) {
                const hold = share;
                hold.amount = parseFloat(amount);
                hold.mode = Number(share.amount) > hold.amount ? 'credit' : 'debit';
                return hold;
            }
            return share
        })
        setUpdateList(list)
    }

    const mutate = useMutation({
        mutationKey: ['shares'],
        mutationFn: ():Promise<AxiosResponse> => new Promise((resolve, reject) => {
            api.post('/admin/update-shares', {
                list: updateList
            })
                .then(result => resolve(result))
                .catch(err => reject(err))
        }),
        onSuccess: res => alert(res.statusText),
        onError: (err: AxiosError) => alert(err?.response?.statusText??err.message)
    })

    return {shares, editAmount, updateList, mutate}
}

