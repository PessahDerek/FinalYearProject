import {useContext} from "react";
import {AppDataContext} from "../../providers/AppDataProvider.tsx";
import {commarise, loanSum} from "../../utils/functions/shortFunctions.ts";


export default function FinancialStatement(){
    const {
        chamaData: {shares, paidLoans, unpaidLoans}
    } = useContext(AppDataContext)
    return (
        <div className={"w-full h-max grid gap-2 bg-base-200 pl-2 pr-2 rounded-md"}>
            <h1>Financial Statement</h1>
            {/*<table className={"financial-statement-tb grid grid-flow-col auto-cols-auto"}>*/}
            <table className={"financial-statement-tb"}>
                <thead className={"w-max grid grid-flow-row"}>
                    <tr className={"grid grid-flow-row !text-left w-max h-full"}>
                        <th>Shares</th>
                        <th>Paid Loans</th>
                        <th>Unpaid Loans</th>
                        <th>Earnings</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ksh. {commarise(
                            shares.flatMap(share => share.history)
                                .reduce((acc, curr)=>acc+curr.amount, 0))}
                        </td>
                    </tr>
                    <tr>
                        <td>Ksh. {commarise(
                            loanSum(paidLoans)
                        )}</td>
                    </tr>
                    <tr>
                        <td>Ksh. {commarise(
                            loanSum(unpaidLoans)
                        )}</td>
                    </tr>
                    <tr>
                        <td>Ksh. {commarise(
                            [...paidLoans].flatMap(l => l.value).reduce((acc, curr)=>acc+curr, 0)
                        )
                        }
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

