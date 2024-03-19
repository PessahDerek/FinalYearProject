import React, {createContext} from "react";
import {AppDataContextObj, ChamaDataResponse, MyDataResponse} from "../vite-env";
import {useQuery} from "@tanstack/react-query";
import {fetchMyData} from "../utils/functions/handlers/fetchData.ts";

const defaults: AppDataContextObj = {
    myData: {
        shares: null,
        paidLoans: [],
        unpaidLoans: []
    },
    chamaData: {
        shares: 0,
        paidLoans: [],
        unpaidLoans: [],
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
        retryOnMount: true,
        retryDelay: 300000
    })
    const chamaData = useQuery({
        queryKey: ['chama-data'],
        queryFn:()=>fetchMyData("/chama/chama-data"),
        initialData: defaults.chamaData,
        retryOnMount: true,
        retryDelay: 300000
    })
    return <AppDataContext.Provider value={{
        myData: {...myData.data as MyDataResponse},
        chamaData: {...chamaData.data as ChamaDataResponse},
        fetching: myData.isFetching
    }} >
        {children}
    </AppDataContext.Provider>
}

