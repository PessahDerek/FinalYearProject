import React, {useContext, useState} from "react";
import {AuthContext} from "../providers/AuthContextProvider.tsx";
import TextInput from "../uiComponents/inputs/TextInput.tsx";
import Button from "../uiComponents/buttons/Button.tsx";
import {LoginDetails, SignupDetails} from "../vite-env";


export default function AuthPage(){
    const {signup, signIn, isSigningIn} = useContext(AuthContext);
    const [login, setLogin] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const loginData: LoginDetails = {
            identifier: form.get("identifier")?.toString()??"",
            password: form.get("password")?.toString()??"",
        };
        const signupData: SignupDetails = {
            firstName: form.get("firstName")?.toString()??"",
            lastName: form.get("lastName")?.toString()??"",
            email: form.get("lastName")?.toString()??"",
            phone: form.get("phone")?.toString()??"",
            password: form.get("password")?.toString()??"",
            confirmPassword: form.get("password")?.toString()??"",
        }
        if(login) return signIn(loginData)
        return signup(signupData)
    }

    return (
        <div className={"w-full h-screen flex custom-blend page"}>
            <form
                onSubmit={handleSubmit}
                className={"w-[90%] min-w-[300px] grid auto-rows-max gap-2 bg-white rounded-sm p-4 m-auto md:absolute md:right-0 md:w-1/3 md:h-full "}
            >
                <span className={"text-4xl font-black"}>{login ? "Login" : "Signup"}</span>
                <div className={"grid md:grid-cols-2 gap-2"}>
                    {!login &&
                        <>
                            <TextInput
                                label={"First Name"}
                                name={"firstName"}
                                required={true}/>
                            <TextInput
                                label={"Last Name"}
                                name={"lastName"}
                                required={true}/>
                            <TextInput
                                label={"Phone"}
                                name={"phone"}
                                required={true}/>
                            <TextInput
                                label={"Email"}
                                name={"email"}
                                required={true}/>
                        </>
                    }

                    {login &&
                        <TextInput
                            label={"Phone/Email/Name"}
                            name={"identifier"}
                            required={true}/>
                    }
                    <TextInput
                        label={"Password"}
                        name={"password"}
                        required={true}/>
                    {!login &&
                        <TextInput
                            label={"Confirm password"}
                            name={"confirmPassword"}
                            required={true}/>
                    }
                </div>
                <Button
                    spin={isSigningIn}
                    text={login ? "Login" : "Signup"}
                    type={'submit'}/>
                <Button
                    text={login ? "Signup instead" : "Login instead"}
                    kind={'outline'}
                    onClick={() => setLogin(!login)}
                />
            </form>
        </div>
    )
}

