import PendingLoanTable from "../../components/adminPage/PendingLoanTable.tsx";
import UpdateLoanTable from "../../components/adminPage/UpdateLoanTable.tsx";


export default function ApproveLoansSubPage(){

    return (
        <div className={"flex-1 p-2 w-full h-full text-center"} >
            <h1>Loans</h1>
            <div className={"w-full grid gap-2"}>
                <PendingLoanTable />
                <UpdateLoanTable />
            </div>
        </div>
    )
}

