import FinancialStatement from "../components/chamaPage/FinancialStatement.tsx";
import AllMembersList from "../components/chamaPage/AllMembersList.tsx";


export default function ChamaPage() {

    return (
        <div className={"page !p-10"}>
            <div className={"w-full grid grid-flow-col gap-4 auto-cols-auto"}>
                <FinancialStatement/>
                <AllMembersList/>
            </div>
        </div>
    )
}

