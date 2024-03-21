import {useEffect, useState} from "react";
import {RepayObj} from "../vite-env";
import useLoanees from "./useLoanees.ts";
import api from "../utils/instances/axios.ts";
import {useMutation} from "@tanstack/react-query";
import {AxiosError, AxiosResponse} from "axios";


export default function useUpdateLoans() {
    const {unpaidLoans} = useLoanees();
    const [repayList, setRepayList] = useState<RepayObj[]>([])

    useEffect(() => {
        unpaidLoans.forEach(unpaid => {
            const repayObject: RepayObj = {userId: unpaid.userId, loanId: unpaid._id, amount: 0}
            setRepayList(prev => ([...prev, repayObject]))
        })
    }, [unpaidLoans])

    const editAmount = (index: number, amount: string) => {
        const list = [...repayList]
        list[index].amount = parseFloat(amount)
        setRepayList(list)
    }

    const submitUpdates = (): Promise<AxiosResponse> => new Promise((resolve, reject)=>{
        const list = repayList.filter(r => r.amount && r.amount > 0)
        api.post("/admin/update-loans", {list: list})
            .then(res=>resolve(res))
            .catch(err => reject(err))
    })

    const mutate = useMutation({
        mutationKey: ['loans'],
        mutationFn: submitUpdates,
        onSuccess: res => alert(res.statusText),
        onError: (err: AxiosError) => alert(err?.response?.statusText??err.message)
    })

    return {repayList, editAmount, submitUpdates, mutate}
}

