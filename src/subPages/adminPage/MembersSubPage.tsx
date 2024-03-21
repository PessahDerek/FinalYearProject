import useMemberManagement from "../../hooks/useMemberManagement.ts";


export default function MembersSubPage(){
    const { unverified } = useMemberManagement()
    return (
        <div className={"w-full flex-1 grid gap-2 auto-rows-max"}>
            <h1>Members</h1>
            <div className={"w-full grid auto-rows-max text-left"}>
                <h2>Pending approvals</h2>
                <table>
                    <thead>
                    <tr>
                        <th>First</th><th>Last</th><th>Phone</th><th>Email</th><th>Initial shares</th><th>Accept</th><th>Deny</th>
                    </tr>
                    </thead>
                    <tbody>
                    {unverified.map(unv =><tr className={"!h-[20vh]"}>
                        <span className={"grid"}>
                            <span className={"grid grid-flow-col auto-cols-fr"}>
                                <td>
                                    {unv.firstName}
                                </td>
                                <td>
                                    {unv.lastName}
                                </td>
                                <td>
                                    {unv.phone}
                                </td>
                                <td>
                                    {unv.email}
                                </td>
                                <td>
                                    <input/>
                                </td>
                                <td>
                                    <input
                                        type={'checkbox'}
                                    />
                                </td>
                                <td>
                                    <input
                                        type={'checkbox'}
                                    />
                                </td>
                            </span>
                            <div>
                                <textarea />
                            </div>
                        </span>
                    </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

