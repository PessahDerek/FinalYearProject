import React, {useMemo, useState} from "react";


interface props extends React.InputHTMLAttributes<HTMLInputElement>{
    label?: string;
}

export default function TextInput({label, ...rest}:props){
    const [focus, setFocus] = useState(false)
    const color = useMemo(()=>
        focus ? "text-accent" : "text-black",
        [focus])
    return (
        <span className={"w-full grid"}>
            {label &&
                <label className={`w-full h-[2em] leading-[2em] text-left ${color}`}>
                    {label}
                </label>
            }
            <input
                {...rest}
                onBlur={()=>setFocus(false)}
                onFocus={()=>setFocus(true)}
                className={"w-full h-[50px] text-black text-left bg-transparent border border-solid border-b " +
                    `border-b-primary-50 focus:border-b-accent pl-4 pr-4 outline-transparent ${rest.className??""} `}
            />
        </span>
    )
}
