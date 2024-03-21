import { useQuery} from "@tanstack/react-query";
import api from "../utils/instances/axios.ts";
import {ChamaModel, LoanModel, UserProfile} from "../vite-env";
import {useMemo, useState} from "react";
import {AxiosError, AxiosResponse} from "axios";
import {defaultUser} from "../providers/AuthContextProvider.tsx";

const defaultChama: ChamaModel = {
    name: "UTSHG",
    members: [],
    loans: [],
    shares: [],
    interestRate: 5,
    penaltyRate: 2,
}

export default function useLoanees(){
    const { data, isFetched } = useQuery({
        queryKey: ['loanees'],
        initialData: defaultChama,
        queryFn: function ():Promise<ChamaModel>{
            return new Promise((resolve, reject)=>{
                try{
                    api.get("/admin/loan-stats")
                        .then(({data}) => {
                            if('name' in data) resolve(data)
                            else resolve(defaultChama)
                        })
                        .catch(err =>{
                            reject(err)
                        })
                }catch (e) {
                    reject(e)
                }
            })
        }
    })
    const totalShares = useMemo(()=>{
        if(!isFetched || !data) return 0;
        return data?.shares.reduce((acc, curr) => acc+curr.realValue, 0)
    }, [data, isFetched])

    const allLoanees: UserProfile[] = useMemo(()=>{
        if(!isFetched || !data) return [];
        return data.members.filter(m => data.loans.find(l => l.userId === m._id))
    }, [data, isFetched])

    const allLoans: LoanModel[] = useMemo(()=>{
        if(!isFetched || !data) return []
        return data.loans
    }, [data, isFetched])

    const pendingLoans: LoanModel[] = useMemo(()=>{
        if(!isFetched && allLoans.length < 1) return []
        return allLoans.filter(l => l.pending)
    }, [allLoans, isFetched])

    const unpaidLoans: LoanModel[] = useMemo(()=>{
        if(!isFetched && allLoans.length < 1) return []
        return allLoans.filter(l => !l.paid)
    }, [allLoans, isFetched])

    const overdueLoans: LoanModel[] = useMemo(()=>{
        if(!isFetched && allLoans.length < 1) return [] ;
        return allLoans.filter(l => l.defaulted)
    },[allLoans, isFetched])

    const getLoanee = (id: string) => {
        return allLoanees.find(f => f._id === id) ?? defaultUser;
    }

    const [approvalList, setApprovalList] = useState<string[]>([])
    const [denialList, setDenialList] = useState<string[]>([])

    const submitApprovals = (): Promise<AxiosResponse> => new Promise((resolve, reject)=>{
        api.post("/admin/approve-loans", {
            approved: approvalList,
            denied: denialList
        })
            .then(response => resolve(response))
            .catch(err => reject(err as AxiosError))
    })


    return {allLoanees, pendingLoans, unpaidLoans, overdueLoans, totalShares, setApprovalList, setDenialList,
        approvalList, denialList, submitApprovals, getLoanee,
    }
}

