import {PathObj} from "../../vite-env";
import Button from "../../uiComponents/buttons/Button.tsx";
import {GiReceiveMoney} from "react-icons/gi";
import {useLocation, useNavigate} from "react-router-dom";
import {HiUserGroup} from "react-icons/hi";
import {FaChartPie} from "react-icons/fa6";


export default function AdminPageMenu() {
    const paths: PathObj[] = [
        {name: "Loans", path: "/", icon: GiReceiveMoney},
        {name: "Shares", path: "/shares", icon: FaChartPie},
        {name: "Members", path: "/members", icon: HiUserGroup},
    ]
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const active = (path: string = "/") => {
        if (path === "/" && pathname.endsWith("/")) return true;
        if(path.replace("/", ""))return pathname.replace("/", "").includes(path.replace("/", ''))
        return false;
    }

    return (
        <section
            className={"hidden md:grid auto-rows-max space-y-5 gap-2 p-2 w-[200px] h-[calc(100vh-60px)] bg-gradient-to-bl from-secondary-900 to-accent-900 text-white "}>
            <h2>U.T.S.H.G</h2>
            <div className={"grid gap-2 auto-rows-max"}>
                {paths.map((path, i) =>
                    <Button
                        kind={active(path.path) ? 'acc' : "out-acc"}
                        text={path.name}
                        key={i}
                        icon={path.icon}
                        onClick={() => navigate(`.${path.path}`)}
                        className={"w-full"}
                    />)}
            </div>
        </section>
    )
}

