import React, {useMemo, useState} from "react";


interface props extends React.InputHTMLAttributes<HTMLInputElement>{
    label?: string;
    lStyle?: string;
}

export default function TextInput({label, lStyle,...rest}:props){
    const [focus, setFocus] = useState(false)
    const color = useMemo(()=>
        focus ? "text-accent" : lStyle?.includes("text")?lStyle:"text-black",
        [focus, lStyle])
    return (
        <span className={"w-full grid"}>
            {label &&
                <label className={`w-full h-[2em] leading-[2em] text-left ${color} `}>
                    {label}
                </label>
            }
            <input
                {...rest}
                onBlur={()=>setFocus(false)}
                onFocus={()=>setFocus(true)}
                className={`${rest.className??""} `}
            />
        </span>
    )
}
