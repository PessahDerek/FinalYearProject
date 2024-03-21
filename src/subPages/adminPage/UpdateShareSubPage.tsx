import useUpdateShares from "../../hooks/useUpdateShares.ts";
import TextInput from "../../uiComponents/inputs/TextInput.tsx";
import Button from "../../uiComponents/buttons/Button.tsx";


export default function UpdateShareSubPage(){
    const { shares, editAmount, updateList, mutate } = useUpdateShares();

    return (
        <div className={"flex-1 w-max m-auto h-max grid auto-rows-max gap-2"}>
            <h1>Shares</h1>
            <table>
                <thead>
                <tr>
                    <td>Name</td><td>Shares</td><td>Amount</td><td>Save</td>
                </tr>
                </thead>
                <tbody>
                {updateList.length > 0 &&
                    shares.map((share, i)=><tr key={share.member._id}>
                    <td>{share.member.firstName}</td>
                    <td>{share.realValue}</td>
                    <td>
                        <TextInput
                            type={'number'}
                            min={0}
                            className={""}
                            value={updateList[i].amount}
                            onChange={e => editAmount(share._id, e.target.value)}
                            id={`input-${share._id}`}
                        />
                    </td>
                    <td>
                        <input
                            type={'checkbox'}
                            value={updateList[i].amount}
                            onChange={e => {
                                const input = document.getElementById(`input-${share._id}`) as HTMLInputElement;
                                if (e.target.checked) {
                                    input.setAttribute('disabled', 'true')
                                } else {
                                    input.removeAttribute('disabled')
                                }
                            }
                            }
                        />
                    </td>
                </tr>)}
                </tbody>
            </table>
            <Button
                disabled={[...updateList.filter(f => f.amount > 0)].length < 1}
                kind={"sec"}
                text={"Submit approval"}
                onClick={()=>mutate.mutate()}
                spin={mutate.isPending}
                className={'sticky top-[90%]'}
            />
        </div>
    )
}

