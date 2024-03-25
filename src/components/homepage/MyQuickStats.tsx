import {useContext} from "react";
import {AppDataContext} from "../../providers/AppDataProvider.tsx";
import {AuthContext} from "../../providers/AuthContextProvider.tsx";
import {commarise, daysDiff, loanSum, sumShareValue, totalRepaid} from "../../utils/functions/shortFunctions.ts";
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
        <div
            className={"w-full h-max grid gap-2 md:w-[40%] bg-base-200 min-w-[300px] p-4 duration-0 text-primary rounded-md"}>
            <h1>Hello {profile?.firstName}<span className={"animate-bounce"}>👋🏾</span></h1>
            <span className={"w-full flex flex-wrap gap-2"}>
                <div className={"quick-card bg-primary text-white"}>
                    <p>Shares</p>
                    <span>
                        <p>Ksh.</p>
                        <h2>{commarise(sumShareValue(shares?.history ?? []))}</h2>
                    </span>
                </div>
                <div className={"quick-card bg-secondary-700 text-white"}>
                    <p>Loan Total</p>
                    <span>
                        <p>Ksh.</p>
                        <h2>{commarise(loanSum(unpaidLoans) ?? 0)}</h2>
                    </span>
                </div>
                <div className={"quick-card bg-accent text-white"}>
                    <p>Loan balance</p>
                    <span>
                        <p>Ksh.</p>
                        <h2>{commarise(
                            loanSum(unpaidLoans) -
                            unpaidLoans.flatMap(f => f.history).reduce((ac, cur) => ac + cur.amount, 0)
                        )}</h2>
                    </span>
                </div>
                <div className={"quick-card bg-white"}>
                    <p>Performance</p> {/** allAmountPaidBack/allAmountBorrowed * 100a */}
                    <h2>{
                        [...unpaidLoans, ...pendingLoans].length > 0 ?
                            ((
                                totalRepaid([...unpaidLoans, ...paidLoans]) /
                                loanSum([...unpaidLoans, ...paidLoans])
                            ) * 100).toFixed(2) : 100
                    }%</h2>
                    <p>Credit score</p>
                </div>
                {unpaidLoans.length > 0 &&
                    <div className={`quick-card text-white ${
                        daysDiff(unpaidLoans[unpaidLoans.length-1]?.deadline.toString()).overdue ? "bg-red" : "bg-secondary"
                    }`}>
                        <p>Deadline</p>
                        <h2>
                            {daysDiff(unpaidLoans[unpaidLoans.length-1]?.deadline.toString()).text}
                        </h2>
                    </div>}
                {pendingLoans.length > 0 &&
                    <div className={"quick-card bg-white"}>
                        <p>Pending loans</p>
                        <h2>{pendingLoans.length}</h2>
                        <p>{pendingLoans[-1]?.createdAt.toString()}</p>
                    </div>}
            </span>
        </div>
    )
}

