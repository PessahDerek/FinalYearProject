import React, {createContext, useEffect, useMemo} from "react";
import {AppDataContextObj, ChamaDataResponse, MyDataResponse, ShareModel} from "../vite-env";
import {useQuery} from "@tanstack/react-query";
import {fetchMyData} from "../utils/functions/handlers/fetchData.ts";
import {sumShareValue} from "../utils/functions/shortFunctions.ts";

const defaults: AppDataContextObj = {
    myData: {
        shares: null,
        paidLoans: [],
        pendingLoans: [],
        unpaidLoans: []
    },
    chamaData: {
        totalShares: 0,
        shares: [],
        paidLoans: [],
        pendingLoans: [],
        unpaidLoans: [],
        unverified: [],
        members: []
    },
    fetching: false
}

export const AppDataContext = createContext<AppDataContextObj>({...defaults})

export function AppDataProvider({children}:{children: React.ReactNode}){
    const myData = useQuery({
        queryKey: ['my_data'],
        queryFn: ()=>fetchMyData("/member/my-data"),
        initialData: defaults.myData,
        // retryOnMount: true,
        retryDelay: 30000
    })
    const chamaData = useQuery({
        queryKey: ['chama-data'],
        queryFn:()=>fetchMyData("/chama/chama-data"),
        initialData: defaults.chamaData,
        // retryOnMount: true,
        retryDelay: 30000,
    })

    useEffect(()=>{

    })

    const chama_Data = useMemo(()=>{
        const result = chamaData.data;
        if((result as ChamaDataResponse).shares){
            result.shares = (result.shares as ShareModel[]).map(res => {
                res.realValue = sumShareValue(res.history);
                return res;
            })
        }
        console.log(result?.shares)
        return result as ChamaDataResponse;
    }, [chamaData.data])

    return <AppDataContext.Provider value={{
        myData: {...myData.data as MyDataResponse},
        // chamaData: {...chamaData.data as ChamaDataResponse},
        chamaData: {...chama_Data},
        fetching: myData.isFetching
    }} >
        {children}
    </AppDataContext.Provider>
}

