import {useContext} from "react";
import {AppDataContext} from "../../providers/AppDataProvider.tsx";
import {AuthContext} from "../../providers/AuthContextProvider.tsx";
import {commarise, loanSum, totalRepaid} from "../../utils/functions/shortFunctions.ts";
import {CgSpinner} from "react-icons/cg";


export default function MyQuickStats() {
    const {profile} = useContext(AuthContext);
    const {
        fetching, myData:
            {shares, unpaidLoans, paidLoans, pendingLoans}
    } = useContext(AppDataContext);

    if (fetching) return (
        <div className={"w-full h-[10vh] "}>
            <CgSpinner className={"animate-spin m-auto"}/>
        </div>
    )

    return (
        <div className={"w-full h-max grid gap-2 md:w-[40%] bg-base-200 min-w-[300px] p-4 duration-0 text-primary rounded-md"}>
            <h1>Hello {profile?.firstName}<span className={"animate-bounce"}>👋🏾</span></h1>
            <span className={"w-full flex flex-wrap gap-2"}>
                <div className={"quick-card bg-white"}>
                    <p>Shares</p>
                    <span>
                        <p>Ksh.</p>
                        <h2>{commarise(shares?.realValue ?? 0)}</h2>
                    </span>
                </div>
                <div className={"quick-card bg-white"}>
                    <p>Loan Sum</p>
                    <span>
                        <p>Ksh.</p>
                        <h2>{commarise(loanSum(unpaidLoans) ?? 0)}</h2>
                    </span>
                </div>
                <div className={"quick-card bg-white"}>
                    <p>Performance</p> {/** allAmountPaidBack/allAmountBorrowed * 100a */}
                    <h2>{
                        [...unpaidLoans, ...pendingLoans].length > 0 ?
                            ((
                                totalRepaid([...unpaidLoans, ...paidLoans])/
                                loanSum([...unpaidLoans, ...paidLoans])
                            )*100).toFixed(2) : 100
                    }%</h2>
                    <p>Credit score</p>
                </div>
                <div className={"quick-card bg-white"}>
                    <p>Pending loans</p>
                    <h2>{pendingLoans.length}</h2>
                    <p>{pendingLoans[-1]?.createdAt.toString()}</p>
                </div>
            </span>
        </div>
    )
}

