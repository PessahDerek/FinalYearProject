import {useEffect, useState} from "react";
import {PathObj} from "../../vite-env";
import {useLocation, useNavigate} from "react-router-dom";
import AOS from 'aos'
import Button from "../buttons/Button.tsx";

interface props {
    paths: PathObj[];
    handleClick: (path: PathObj) => void;
}


export default function NavigationSet({paths}: props) {
    const [dropped, setDropped] = useState(false);
    const navigate = useNavigate();
    const {pathname} = useLocation()
    const handleDrop = () => {
        setDropped(!dropped);
    }

    useEffect(() => {
        if (dropped) {
            AOS.refresh()
        }
    }, [dropped])

    const active = (path: string="/") => {
        if(path === "/" && (pathname === path)) return true
        return pathname.replace("/", "").includes(path)
    }

    const handleClick = (path: PathObj) => {
        if(path.action) return path.action()
        navigate(path.path)
    }

    return (
        <>
            <div className={"w-max mt-auto mb-auto hidden md:grid grid-flow-col gap-2"}>
                {paths.map(
                    (path, i) =>
                        <Button
                            text={path.name}
                            kind={active(path.path)?"acc-text-btn":"white-text-btn"}
                            key={i}
                            icon={path.icon}
                            onClick={()=>handleClick(path)}
                            className={`pl-4 pr-4 ${active(path.path)?"under":""}`}
                        />
                )
                }
            </div>
            <div className={"mt-auto mb-auto w-max h-max block md:hidden origin-right "}>
                <button className={"w-[50px] h-max grid gap-2"} onClick={handleDrop}>
                    <div className={`${dropped ? "w-[40px]" : "w-[50px]"} h-[3px] ml-auto transition-all bg-white`}/>
                    <div className={`${dropped ? "w-[20px]" : "w-[50px]"} h-[3px] ml-auto transition-all bg-white`}/>
                    <div className={`${dropped ? "w-[30px]" : "w-[50px]"} h-[3px] ml-auto transition-all bg-white`}/>
                </button>
                {dropped &&
                    <div
                        data-aos={"fade-left"} data-aos-duration={"400"}
                        className={`fixed right-0 top-[60px] w-[200px] z-40 shadow-xl grid bg-gradient-to-l from-primary to-secondary`}>
                        {paths.map((path, i) => <button
                            key={i}
                            className={"w-full h-[50px] leading-[50px] flex justify-center gap-2 bg-inherit active:bg-accent-600"}
                            onTouchEnd={() => {
                                handleClick(path)
                                setDropped(false)
                            }}
                        >
                            {path.name}
                            {path.icon && <path.icon className={"mt-auto mb-auto"}/>}
                        </button>)
                        }
                    </div>
                }
            </div>
        </>
    )
}

