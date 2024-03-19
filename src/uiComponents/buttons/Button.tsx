import React from "react";
import {IconType} from "react-icons";
import {CgSpinner} from "react-icons/cg";
import {btnType} from "../../vite-env";


interface btnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    icon?: IconType;
    spin?: boolean;
    kind?: btnType;
}

export default function Button({text, spin, kind, icon,...rest}: btnProps) {
    const style: { [key in btnType]: string } = {
        "prim": "primary-btn",
        "sec": "secondary-btn",
        "red": "danger-btn",
        "outline": "outlined primary-outline",
        "out-sec": "outlined secondary-outline",
        "out-acc": "outlined accent-outline",
        "prim-text-btn": "prim-text-btn",
        "sec-text-btn": "sec-text-btn",
        "acc-text-btn": "acc-text-btn",
        "white-text-btn": "white-text-btn",
        "prim-under" : "under primary-underline",
        "sec-under": "under secondary-underline",
        "acc-under": "under accent-underline"
    }
    const Icon = icon;
    return (
        <button
            {...rest}
            type={rest.type ? rest.type : "button"}
            className={`${style[kind ?? "prim"]} ${rest.className??""}`}
        >
            <span className={"m-auto flex gap-2"}>
                {spin ?
                    <CgSpinner className={"animate-spin"}/>
                    :
                    text
                }
                {Icon &&
                    <Icon className={"m-auto"}/>
                }
            </span>
        </button>
    )
}


