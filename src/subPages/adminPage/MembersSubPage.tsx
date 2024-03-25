import useMemberManagement from "../../hooks/useMemberManagement.ts";
import {CgSpinner} from "react-icons/cg";


export default function MembersSubPage() {
    const {unverified, approve, reject} = useMemberManagement();
    // userId, initialShare, approved, role, denialReason


    return (
        <div className={"w-full flex-1 grid gap-2 auto-rows-max"}>
            <h1>Members</h1>
            <div className={"w-full grid auto-rows-max text-left"}>
                <h2>Pending approvals</h2>
                <div className={"w-full custom-table grid auto-rows-max"}>
                    <div className={"header"}>
                        <span>First name</span><span>Last name</span><span>Phone</span><span>Email</span><span>Initial shares</span><span>Accept</span><span>Deny</span>
                    </div>
                    <div className={"t-body"}>
                        {unverified.map(unv => <div key={unv._id} className={"parent-row"}>
                            <span className={"row"}>
                                <span>
                                    {unv.firstName}
                                </span>
                                <span>
                                    {unv.lastName}
                                </span>
                                <span>
                                    {unv.phone}
                                </span>
                                <span>
                                    {unv.email}
                                </span>
                                <span>
                                    <input
                                        placeholder={"Initial shares"}
                                        id={`share-${unv._id}`}
                                    />
                                </span>
                                <span>
                                    {approve.isPending &&
                                        <CgSpinner className={"absolute animate-spin m-auto left-0 right-0 z-10 top-0 bottom-0"}/>}
                                    <input
                                        type={'checkbox'}
                                        className={'!text-center'}
                                        disabled={approve.isPending || reject.isPending}
                                        onClick={e=>{
                                            approve.mutate({userId: unv._id??""})
                                            e.currentTarget.checked = !approve.isError
                                        }}
                                    />
                                </span>
                                <span>
                                    {reject.isPending && <CgSpinner className={"absolute animate-spin m-auto left-0 right-0 z-10 top-0 bottom-0"}/>}
                                    <input
                                        type={'checkbox'}
                                        disabled={approve.isPending || reject.isPending || reject.isSuccess}
                                        onChange={e=>{
                                            reject.mutate({userId: unv._id??""})
                                            e.currentTarget.checked = !reject.isError
                                        }}
                                    />
                                </span>
                            </span>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

