import {useContext, useMemo, useState} from "react";
import {AppDataContext} from "../../providers/AppDataProvider.tsx";
import TextInput from "../../uiComponents/inputs/TextInput.tsx";


export default function AllMembersList(){
    const {chamaData: {members}} = useContext(AppDataContext)
    const [search, setSearch] = useState("");
    const list = useMemo(()=>{
        if(!search || search.length < 1) return members;
        return members.filter(m => Object.values(m).join("").toLowerCase().includes(search))
    }, [search, members])
    return (
        <div className={"flex-1 w-full grid gap-2 bg-base-200 pl-2 pr-2 rounded-md"}>
            <h1>All members</h1>
            <TextInput
                placeholder={"Search"}
                className={"bg-white rounded-xl"}
                onChange={e=>setSearch(e.target.value)}
            />
            <table>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {list.map(member => <tr key={member._id}>
                    <td>{member.firstName}</td>
                    <td>{member.lastName}</td>
                    <td><a href={`tel://${member.phone}`}>{member.phone}</a></td>
                    <td><a href={`mailto:${member.email}`}>{member.email}</a></td>
                    <td>{member.role??"member"}</td>
                </tr>)
                }
                </tbody>
            </table>
        </div>
    )
}

