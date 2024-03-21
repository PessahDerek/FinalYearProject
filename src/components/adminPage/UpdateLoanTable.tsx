import useLoanees from "../../hooks/useLoanees.ts";
import {commarise, daysDiff, totalRepaid} from "../../utils/functions/shortFunctions.ts";
import TextInput from "../../uiComponents/inputs/TextInput.tsx";
import useUpdateLoans from "../../hooks/useUpdateLoans.ts";
import Button from "../../uiComponents/buttons/Button.tsx";


export default function UpdateLoanTable(){
    const {unpaidLoans,getLoanee} = useLoanees();
    const { repayList, editAmount, mutate } = useUpdateLoans()
    const lockEdit = (index: number, lock: boolean) => {
        const input = document.getElementById(`update_${index}`);
        if(input){
            if(lock) return input.setAttribute("disabled", "true")
            input.removeAttribute("disabled")
        }
    }

    return (
        <div className={"w-full h-full p-2 rounded-md grid gap-2 auto-rows-max"}>
            <h2 className={"text-left"}>Update Loans</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Loan</th>
                    <th>Deadline</th>
                    <th>Balance</th>
                    <th>Amount</th>
                    <th>Save</th>
                </tr>
                </thead>
                <tbody>
                {repayList.length>0 && unpaidLoans.map((loan, i)=><tr key={i}>
                    <td>{getLoanee(loan.userId).firstName}</td>
                    <td>{commarise(loan.principal+loan.value)}</td>
                    <td>{daysDiff(loan.deadline.toString())}</td>
                    <td>Ksh.{commarise((loan.principal+loan.value)-totalRepaid([loan]))}</td>
                    <td>
                        <TextInput
                            id={`update_${i}`}
                            value={repayList[i]?.amount??"0"}
                            type={'number'}
                            onChange={e=>editAmount(i, e.target.value)}
                            className={`w-[100px] m-auto text-center disabled:text-gray-400 
                            ${(repayList[0]?.amount > (loan.principal+loan.value)-totalRepaid([loan]))?"text-red":"text-primary"}`}
                        />
                    </td>
                    <td>
                        <input
                            type={'checkbox'}
                            onChange={({target: {checked}})=>lockEdit(i, checked)}
                        />
                    </td>
                </tr>)}
                </tbody>
            </table>
            <Button
                disabled={repayList.filter(r=>r.amount>0).length < 1}
                kind={"sec"}
                text={"Submit approval"}
                onClick={()=>mutate.mutate()}
                spin={mutate.isPending}
                className={'sticky top-[90%]'}
            />
        </div>
    )
}

