import TextInput from "../uiComponents/inputs/TextInput.tsx";
import {useContext} from "react";
import {AuthContext} from "../providers/AuthContextProvider.tsx";
import Button from "../uiComponents/buttons/Button.tsx";
import {BsPencil} from "react-icons/bs";
import {RiLogoutCircleFill} from "react-icons/ri";


export default function ProfilePage() {
    const {profile, signOut} = useContext(AuthContext);

    const handleSignout = () => {
        const proceed = window.confirm("Are you sure you want to sign out? You will be logged out")
        if(proceed) return signOut()
    }

    return (
        <div className={"page"}>
            <div className={"flex gap-4 w-full text-black max-w-4xl m-auto h-max"}>
                <form
                    className={"w-[300px] h-full p-4 grid gap-2 rounded-md bg-base-300"}
                >
                    <h1>Profile Info</h1>
                    <TextInput
                        label={"Fist name"}
                        defaultValue={profile?.firstName}
                    />
                    <TextInput
                        label={"Last name"}
                        defaultValue={profile?.lastName}
                    />
                    <TextInput
                        label={"Phone"}
                        defaultValue={profile?.phone}
                    />
                    <TextInput
                        label={"Email"}
                        defaultValue={profile?.email}
                    />
                    <Button
                        kind={"out-acc"}
                        text={"Edit"}
                        icon={BsPencil}
                        className={"w-full"}
                    />
                </form>
                <div className={"flex-1 grid gap-2 "}>
                    <form className={"w-full h-max grid auto-rows-max bg-base-300 p-4 gap-2 grid-flow-row"}>
                        <h2>Reset password</h2>
                        <TextInput
                            label={"Current password"}
                            name={"current"}
                            type={'password'}
                        />
                        <TextInput
                            label={"New password"}
                            name={"current"}
                            type={'password'}
                        />
                        <TextInput
                            label={"Confirm"}
                            name={"current"}
                            type={'password'}
                        />
                        <Button
                            text={"Reset password"}
                        />
                    </form>
                    <Button
                        text={"Logout"}
                        kind={"outline"}
                        icon={RiLogoutCircleFill}
                        onClick={handleSignout}
                        className={" !text-red !shadow-red"}
                    />
                </div>
            </div>
        </div>
    )
}

