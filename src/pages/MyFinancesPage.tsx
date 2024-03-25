import MyQuickStats from "../components/homepage/MyQuickStats.tsx";
import RequestLoanForm from "../components/myFinancesPage/RequestLoanForm.tsx";


export default function MyFinancesPage(){

    return (
        <div className={"flex page "} >
            <div className={"w-full flex gap-4 flex-wrap m-auto"}>
                <MyQuickStats />
                <div className={"flex-1"}>
                    <RequestLoanForm />
                </div>
            </div>
        </div>
    )
}

