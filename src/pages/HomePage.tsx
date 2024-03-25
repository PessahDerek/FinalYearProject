import MyQuickStats from "../components/homepage/MyQuickStats.tsx";
import ChamaQuickFacts from "../components/homepage/ChamaQuickFacts.tsx";


export default function HomePage(){

    return (
        <div className={"page flex"}>
            <div className={"w-[98%] flex justify-center flex-wrap gap-4 m-auto"}>
                <MyQuickStats />
                <ChamaQuickFacts />
            </div>
        </div>
    )
}

