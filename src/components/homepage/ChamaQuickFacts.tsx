import {useContext} from "react";
import {AppDataContext} from "../../providers/AppDataProvider.tsx";
import {CgSpinner} from "react-icons/cg";
import {commarise} from "../../utils/functions/shortFunctions.ts";


export default function ChamaQuickFacts(){
    const {fetching, chamaData: { members, shares, paidLoans, unpaidLoans }
    } = useContext(AppDataContext)

    if(fetching) return <div className={"w-full"}>
        <CgSpinner className={"animate-spin duration-75"} />
    </div>
    return (
        <div className={"flex-1 bg-base-200 p-4 rounded-md m-auto"} >
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
                        <h2>{commarise(shares)}</h2>
                    </span>
                </div>
                <div className={"quick-card bg-white"}>
                    <p>Loans</p>
                    <span>
                        <div>
                            <h2>{unpaidLoans.length}/{unpaidLoans.length+paidLoans.length}</h2>
                            </div>
                        <p>(Unpaid)</p>
                    </span>
                </div>
                <div className={"quick-card bg-white"}>
                    <p>Performance</p>
                    <span>
                        <h2>{commarise(
                            paidLoans.reduce((acc, curr)=> acc+curr.value,0)
                        )
                        }%</h2>
                        <p></p>
                    </span>
                </div>

            </span>
        </div>
    )
}

