import useLoanees from "../../hooks/useLoanees.ts";
import {commarise, monthDiff} from "../../utils/functions/shortFunctions.ts";
import Button from "../../uiComponents/buttons/Button.tsx";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";


export default function PendingLoanTable() {
    const {
        submitApprovals, pendingLoans, getLoanee, unpaidLoans,
        setApprovalList, setDenialList, approvalList, denialList
    } = useLoanees();

    const hasPending = (userId: string) => unpaidLoans.reduce((acc, curr) => acc + ((!curr.paid && curr.userId === userId && !curr.pending && curr.approved) ? (curr.principal + curr.value) : 0), 0);

    const approve = (id: string) => {
        const list = [...new Set([...approvalList, id])]
        const denial = denialList.filter(p => p !== id)
        setApprovalList(list)
        setDenialList(denial)
    }
    const deny = (id: string) => {
        const list = [...new Set([...denialList, id])]
        const approved = approvalList.filter(p => p !== id)
        setApprovalList(approved)
        setDenialList(list)
    }
    const allApproved = () => {
        if(approvalList.length < 1) return false
        for (const elem of pendingLoans.map(p => p.userId))
            if (!approvalList.includes(elem))
                return false
        return true
    }
    const allDenied = () => {
        if(denialList.length < 1) return false
        for (const elem of pendingLoans.map(p => p.userId))
            if (!denialList.includes(elem))
                return false
        return true
    }

    const {mutate, isPending} = useMutation({
        mutationKey: ['loanees'],
        mutationFn: submitApprovals,
        onSuccess: (res)=>alert(res.statusText),
        onError: (err: AxiosError) => alert(err?.response?.statusText)
    })

    return (
        <div className={"w-full h-max min-h-[20vh] grid auto-rows-max gap-2"}>
            <h2 className={"text-left"}>Pending loans</h2>
            {/*<table className={"w-full  grid auto-rows-max pending-loan-table "}>*/}
            <table className={""}>
                {/*<thead className={"w-full bg-primary h-[50px] text-white"}>*/}
                <thead className={""}>
                {/*<tr className={"h-[50px] grid grid-flow-col  "}>*/}
                <tr className={" "}>
                    <th>Name</th>
                    <th>Principal</th>
                    <th>Duration</th>
                    <th>Value</th>
                    <th>Outstanding</th>
                    <th className={"flex gap-2 justify-center"}>
                        <span className={"h-full leading-[50px] mt-auto mb-auto"}>Approve</span>
                        <input
                            type={'checkbox'}
                            name={'approve'}
                            checked={allApproved()}
                            onChange={(e) => {
                                if (e.target.checked) return pendingLoans.forEach((li) => approve(li.userId))
                                setApprovalList([])
                            }
                            }
                        />
                    </th>
                    <th className={"flex gap-2 justify-center"}>
                        <span className={"leading-[50px]"}>Deny</span>
                        <input
                            type={'checkbox'}
                            name={'approve'}
                            checked={allDenied()}
                            onChange={(e) => {
                                if (e.target.checked) return pendingLoans.forEach((li) => deny(li.userId))
                                setDenialList([])
                            }
                            }
                        />
                    </th>
                </tr>
                </thead>
                <tbody>
                {pendingLoans.map(
                    (loan, i) => <tr key={i}>
                        <td>{getLoanee(loan.userId).firstName}</td>
                        <td>{commarise(loan.principal)}</td>
                        <td>{monthDiff(loan.deadline.toString())} month{monthDiff(loan.deadline.toString()) > 1 && "s"}</td>
                        <td>{commarise(loan.value)}</td>
                        <td>{hasPending(loan.userId) ? hasPending(loan.userId) : 0}</td>
                        <td>
                            <input
                                type={'checkbox'}
                                name={'approve'}
                                checked={approvalList.includes(loan.userId) && !denialList.includes(loan.userId)}
                                onChange={e => {
                                    if(e.target.checked) return approve(loan.userId)
                                    setApprovalList(p => ([...p.filter(l => l!== loan.userId)]))
                                }
                                }
                            />
                        </td>
                        <td>
                            <input
                                type={'checkbox'}
                                name={'approve'}
                                checked={!approvalList.includes(loan.userId) && denialList.includes(loan.userId)}
                                onChange={e => {
                                    if(e.target.checked)deny(loan.userId)
                                    else setDenialList(p => ([...p.filter(l => l!== loan.userId)]))
                                }
                                }
                            />
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <Button
                disabled={[...approvalList, ...denialList].length < 1}
                kind={"sec"}
                text={"Submit approval"}
                onClick={()=>mutate()}
                spin={isPending}
                className={'sticky top-[90%]'}
            />
        </div>
    )
}

