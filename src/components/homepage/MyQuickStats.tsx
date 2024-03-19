import {useContext} from "react";
import {AppDataContext} from "../../providers/AppDataProvider.tsx";
import {AuthContext} from "../../providers/AuthContextProvider.tsx";
import {commarise, loanSum} from "../../utils/functions/shortFunctions.ts";
import {CgSpinner} from "react-icons/cg";


export default function MyQuickStats(){
    const { profile } = useContext(AuthContext);
    const { fetching, myData:
        {shares, unpaidLoans, paidLoans}
    } = useContext(AppDataContext);

    if(fetching) return (
        <div className={"w-full h-[10vh] "}>
            <CgSpinner className={"animate-spin"} />
        </div>
    )
    return (
        <div className={"w-full md:w-[40%] bg-base-200 min-w-[300px] p-4 text-primary rounded-md"} >
            <h1>Hello {profile?.firstName}<span className={"animate-bounce"}>👋🏾</span></h1>
            <span className={"w-full flex flex-wrap gap-2"}>
                <div className={"quick-card bg-white"}>
                    <p>Shares</p>
                    <span>
                        <p>Ksh.</p>
                        <h2>{commarise(shares?.realValue??0)}</h2>
                    </span>
                </div>
                <div className={"quick-card bg-white"}>
                    <p>Loans</p>
                    <span>
                        <p>Ksh.</p>
                        <h2>{commarise(loanSum(unpaidLoans) ?? 0)}</h2>
                    </span>
                </div>
                <div className={"quick-card bg-white"}>
                    <p>Performance</p>
                    <h2>{paidLoans.length > 0 ?
                        (paidLoans.length / (paidLoans.length + unpaidLoans.length) * 100)
                        :
                        100
                    }%</h2>
                    <p>Credit score</p>
                </div>
            </span>
        </div>
    )
}

