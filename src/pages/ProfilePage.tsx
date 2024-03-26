import TextInput from "../uiComponents/inputs/TextInput.tsx";
import React, {useContext, useEffect, useMemo, useState} from "react";
import {AuthContext, defaultUser} from "../providers/AuthContextProvider.tsx";
import Button from "../uiComponents/buttons/Button.tsx";
import {BsPencil} from "react-icons/bs";
import {RiLogoutCircleFill} from "react-icons/ri";
import {UserProfile} from "../vite-env";
import {RxCross1} from "react-icons/rx";


export default function ProfilePage() {
    const {profile, editProfile, signOut} = useContext(AuthContext);
    const [edit, setEdit] = useState(false)
    const [edited, setEdited] = useState<UserProfile>({
        ...profile ?? {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            role: "member"
        }
    })
    const myProfile = useMemo(() => {
        if (edit) return edited;
        if (!profile) return defaultUser
        return profile;
    }, [edit, edited, profile])
    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEdited(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    const handleSignout = () => {
        const proceed = window.confirm("Are you sure you want to sign out? You will be logged out")
        if (proceed) return signOut()
    }
    const handleEdit = () => {
        if (!edit) return setEdit(true)
        editProfile?.mutate(myProfile)
    }
    const handleCancel = () => {
        setEdit(false)
    }

    useEffect(() => {
        if(editProfile?.isSuccess && editProfile.isIdle) setEdit(false)
    }, [editProfile?.isIdle, editProfile?.isSuccess]);

    return (
        <div className={"page"}>
            <div className={"flex flex-wrap gap-4 w-full text-black max-w-4xl m-auto h-max"}>
                <form
                    className={"min-w-[300px] flex-1 h-full p-4 grid gap-2 rounded-md bg-base-300"}
                >
                    <h1>Profile Info</h1>
                    <TextInput
                        label={"Fist name"}
                        disabled={!edit}
                        value={myProfile?.firstName}
                        name={"firstName"}
                        onChange={change}
                    />
                    <TextInput
                        label={"Last name"}
                        disabled={!edit}
                        value={myProfile?.lastName}
                        name={"lastName"}
                        onChange={change}
                    />
                    <TextInput
                        label={"Phone"}
                        disabled={!edit}
                        value={myProfile?.phone}
                        name={"phone"}
                        onChange={change}
                    />
                    <TextInput
                        label={"Email"}
                        disabled={!edit}
                        value={myProfile?.email}
                        name={"email"}
                        onChange={change}
                    />
                    <Button
                        kind={edit ? "sec" : "out-acc"}
                        text={edit ? "Save" : "Edit"}
                        icon={BsPencil}
                        onClick={handleEdit}
                        spin={editProfile?.isPending}
                        disabled={editProfile?.isPending}
                        className={"w-full"}
                    />
                    {(edit && !editProfile?.isSuccess) &&
                        <Button
                            kind={"prim-text-btn"}
                            text={"Cancel"}
                            icon={RxCross1}
                            onClick={handleCancel}
                            className={"w-full !text-red"}
                        />}
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

