import {useContext, useMemo} from "react";
import {AppDataContext} from "../../providers/AppDataProvider.tsx";
import {CgSpinner} from "react-icons/cg";
import {commarise, loanSum, totalRepaid} from "../../utils/functions/shortFunctions.ts";


export default function ChamaQuickFacts() {
    const {
        fetching, chamaData:
            {members, totalShares, paidLoans, unpaidLoans, pendingLoans}
    } = useContext(AppDataContext)

    const profitPercent = useMemo(() => {
        const allLoans = [...unpaidLoans, ...paidLoans]
        const gain = allLoans.reduce((acc, curr) => acc + curr.value, 0)
        const principal = allLoans.reduce((acc, curr) => acc + curr.principal, 0)
        const profit = parseFloat(((gain / principal) * 100).toFixed(2))
        return (Number.isNaN(profit)) ? 0 : profit;
    }, [paidLoans, unpaidLoans])

    if (fetching) return <div className={"w-full"}>
        <CgSpinner className={"animate-spin m-auto duration-75"}/>
    </div>
    return (
        <div className={"flex-1 bg-base-200 p-4 rounded-md m-auto"}>
            <h1>Umoja Teachers</h1>
            <span className={"w-full flex flex-wrap gap-2"}>
                <div className={"quick-card bg-white"}>
                    <p>Members</p>
                    <h2>{members.length}</h2>
                </div>
                <div className={"quick-card bg-white"}>
                    <p>Total shares</p>
                    <span>
                        <p>Ksh.</p>
                        <h2>{commarise(totalShares)}</h2>
                    </span>
                </div>
                <div className={"quick-card bg-white"}>
                    <p>Active loans</p>
                    <h2>{unpaidLoans.length}</h2>
                </div>
                <div className={"quick-card bg-white"}>
                    <p>Performance</p>
                    <span>
                        <h2>{
                            //     sum_of_all_amount_paid_back / sum_of_all_given_out * 100%
                            [...unpaidLoans, ...pendingLoans].length > 0 ?
                                ((
                                    totalRepaid([...unpaidLoans, ...paidLoans]) /
                                    loanSum([...unpaidLoans, ...paidLoans])
                                ) * 100).toFixed(2) : 100
                        }%</h2>
                        <p></p>
                    </span>
                </div>
                <div className={"quick-card bg-white"}>
                    <p>Chama profit</p>
                    <h2>{profitPercent}%</h2>
                </div>

            </span>
        </div>
    )
}

