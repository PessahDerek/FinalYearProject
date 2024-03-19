import {PathObj} from "../../vite-env";
import {RiAccountCircleFill, RiDashboardFill} from "react-icons/ri";
import NavigationSet from "./NavigationSet.tsx";
import {MdAttachMoney} from "react-icons/md";
import {HiUserGroup} from "react-icons/hi";

export default function AppNavBar() {
    const paths:PathObj[] = [
        {name: "Dashboard", path: "/", icon: RiDashboardFill},
        {name: "My Finance", path: "/loans", icon: MdAttachMoney},
        {name: "Chama", path: "/chama", icon: HiUserGroup},
        {name: "Profile", path: "/profile", icon: RiAccountCircleFill},
    ]
    return (
        <nav
            className={"w-full h-[60px] text-white sticky top-0 z-50 bg-gradient-to-r from-primary to-90% to-secondary md:to-secondary-800 " +
                "flex justify-between pl-2 pr-2"}
        >
            <a className={"h-[calc(4%+12px)] mt-auto mb-auto flex"} href={"/"}>
                <p className={"text-[32px] h-[32px] self-end "}>U.T</p>
                <p className={"text-[14px] h-[14px] self-end "}>self-help group</p>
            </a>
            <NavigationSet paths={paths} handleClick={()=>{}}/>
        </nav>
    )
}

