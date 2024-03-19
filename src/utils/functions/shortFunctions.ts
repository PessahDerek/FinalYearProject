import {LoanModel} from "../../vite-env";


export const commarise = (value: number) =>{
    const [whole,decimal] = value.toString().split(".")
    let result: string[] = []
    const holdArray = whole.split("")
    const count = Math.floor(whole.toString().length/3)
    for(let counter = 1; counter <= count; counter++){
        result = result.concat([...holdArray.splice(-3).reverse(), ","]);
    }
    result = result.concat(holdArray).reverse()
    if(decimal) result.push(`.${decimal}${Number(decimal) < 10?"0":""}`)
    return result.join("")
}
export const loanSum = (loans: LoanModel[]) => {
    return loans.reduce((acc, curr)=> acc+curr.value,0)
}