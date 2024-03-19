import api from "../../instances/axios.ts";
import {ChamaDataResponse, MyDataResponse} from "../../../vite-env";


export const fetchMyData = (path: string): Promise<MyDataResponse|ChamaDataResponse> => {
    return new Promise((resolve, reject)=>{
        try {
            api.get(path)
                .then(({data})=>resolve(data))
        }catch (e) {
            reject(e)
        }
    })
}

