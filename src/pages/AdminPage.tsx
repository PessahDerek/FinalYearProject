import {Route, Routes} from "react-router-dom";
import ApproveLoansSubPage from "../subPages/adminPage/ApproveLoansSubPage.tsx";
import AdminPageMenu from "../components/adminPage/AdminPageMenu.tsx";
import UpdateShareSubPage from "../subPages/adminPage/UpdateShareSubPage.tsx";
import MembersSubPage from "../subPages/adminPage/MembersSubPage.tsx";


export default function AdminPage() {

    return (
        <div className={"page !p-0 flex w-full h-full"}>
            <AdminPageMenu />
            <div className={"flex-1"}>
                <Routes>
                    <Route index={true} element={<ApproveLoansSubPage/>}/>
                    <Route path={"/shares"} element={<UpdateShareSubPage/>}/>
                    <Route path={"/members"} element={<MembersSubPage/>}/>
                </Routes>
            </div>
        </div>
    )
}

