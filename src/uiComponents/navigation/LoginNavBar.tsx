'use client'
import NavigationSet from "./NavigationSet.tsx";
import {PathObj} from "../../vite-env";
import {IoLogIn} from "react-icons/io5";
import {MdAccountCircle} from "react-icons/md";
import {useNavigate} from "react-router-dom";

export default function LoginNavBar() {
    const paths: PathObj[] = [
        {name: "Login", path: "auth/login", icon: MdAccountCircle},
        {name: "Signup", path: "auth/signup", icon: IoLogIn}
    ]
    const route = useNavigate()
    const handleCLick = (path: PathObj) => {
        if (path.path) route(`/${path.path}`)
        if (path.action) path.action()
    }
    return (
        <nav
            className={"w-full h-[70px] flex pl-2 pr-2 justify-between bg-accent text-white shadow-lg leading-[70px] z-40 sticky top-0 "}
        >
            <span className={"text-[2vmax] font-bold"}>
                U.T.S.H.G
            </span>
            <div className={"flex"}>
                <div className={"hidden md:grid grid-flow-col gap-4"}>
                    {paths.map((path, i) =>
                        <button
                            key={i}
                            className={"flex gap-2"}
                            onClick={() => handleCLick(path)}
                        >
                        <span className={"flex"}>
                            {path.name}
                            {path.icon && <path.icon className={'m-auto'}/>}
                        </span>
                        </button>
                    )
                    }
                </div>
                <NavigationSet
                    paths={paths}
                    handleClick={handleCLick}
                />
            </div>
        </nav>
    )
}

