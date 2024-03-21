import Button from "../../uiComponents/buttons/Button.tsx";
import TextInput from "../../uiComponents/inputs/TextInput.tsx";
import {IoSend} from "react-icons/io5";
import React, {useRef, useState} from "react";
import {RxCross1} from "react-icons/rx";
import {GiReceiveMoney} from "react-icons/gi";
import {useMutation} from "@tanstack/react-query";
import {AxiosError, AxiosResponse} from "axios";
import api from "../../utils/instances/axios.ts";


export default function RequestLoanForm() {
    const loanForm = useRef<HTMLFormElement>(null)
    const [drop, setDrop] = useState(window.innerWidth > 500)

    const handleClick = () => {
        if (!drop) return setDrop(true)
    }

    const {mutate} = useMutation({
        mutationKey: ['my-data'],
        mutationFn: (e: React.FormEvent<HTMLFormElement>): Promise<AxiosResponse> =>{
            return new Promise((resolve, reject)=>{
                e.preventDefault();
                if(!loanForm.current) return reject("Please refresh and try again!")
                const form = new FormData(loanForm.current)
                const data: {[key: string]: string} = {}
                form.forEach((val, key)=>{
                    data[key] =val.toString()
                })
                try{
                    const result = api.post("/member/request-loan", data)
                    resolve(result)
                }catch (e) {
                    reject(e)
                }
            })
        },
        onSuccess: (res: AxiosResponse)=>{
            alert(res.statusText)
        },
        onError: (err)=>{
            if(err instanceof AxiosError) return alert(err.response?.statusText)
            alert(err.message)
        }
    })

    return (
        <span className={"w-full grid gap-4 bg-base-200 rounded-md p-4"}>
            {(window.innerWidth > 500 || (drop)) &&
                <form
                    ref={loanForm}
                    onSubmit={mutate}
                    data-aos={'fade-up'} data-aos-duration={500}
                    className={"w-full grid gap-2"}
                >
                    <h1>Request loan</h1>
                    <TextInput
                        label={"Loan amount"}
                        placeholder={"1000"}
                        name={"amount"}
                    />
                    <TextInput
                        label={"Deadline"}
                        type={"date"}
                        defaultValue={new Date(Date.now() + 2629632000).toDateString()}
                        placeholder={"20/3/2024"}
                        name={"deadline"}
                    />
                    <TextInput
                        label={"Password"}
                        placeholder={"Password"}
                        name={'password'}
                    />
                    <Button
                        type={"submit"}
                        text={"Request loan"}
                        kind={'acc'}
                        className={"w-full"}
                        icon={IoSend}
                        onClick={handleClick}
                    />
                </form>}
            {window.innerWidth < 500 &&
                <Button
                    text={drop ? "Cancel":"Request loan"}
                    kind={drop ? 'out-sec':'sec'}
                    className={"w-full"}
                    icon={drop ? RxCross1 : GiReceiveMoney}
                    onClick={()=>setDrop(!drop)}
                />}
        </span>
    )
}

