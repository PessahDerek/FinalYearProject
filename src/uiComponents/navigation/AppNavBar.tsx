import {PathObj} from "../../vite-env";
import {RiAccountCircleFill, RiAdminFill, RiDashboardFill} from "react-icons/ri";
import NavigationSet from "./NavigationSet.tsx";
import {MdAttachMoney} from "react-icons/md";
import {HiUserGroup} from "react-icons/hi";
import {useContext, useMemo} from "react";
import {AuthContext} from "../../providers/AuthContextProvider.tsx";

export default function AppNavBar() {
    const { profile } = useContext(AuthContext)

    const paths = useMemo(()=> {
        const defaultPaths: PathObj[] = [
            {name: "Dashboard", path: "/", icon: RiDashboardFill},
            {name: "My Finance", path: "/my-finance", icon: MdAttachMoney},
            {name: "Chama", path: "/chama", icon: HiUserGroup},
            {name: "Profile", path: "/profile", icon: RiAccountCircleFill},
        ]
        if(profile?.role === 'admin') defaultPaths.push(
            {name: "Admin", path: "/admin/", icon: RiAdminFill}
        )
        return defaultPaths;
    }, [profile]);

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

