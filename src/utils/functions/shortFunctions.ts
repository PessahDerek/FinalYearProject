import {LoanModel, ShareHistory} from "../../vite-env";


export const commarise = (value: number) =>{
    const [whole,decimal] = value.toString().split(".")
    let result: string[][] = []
    const hold = whole.split("");
    for(let i = (whole.length % 3 ? 0 : 1) ; i < Math.floor(whole.length/3); i++){
        result.push([",", ...hold.splice(-3)])
    }
    result.unshift(hold)
    const dec = Number(`0.${decimal}`).toFixed(2).toString().slice(2)
    if(decimal)result = result.concat([".", dec])
    return ([] as string[]).concat(...result).join("")
}
export const loanSum = (loans: LoanModel[]) => {
    return loans.reduce((acc, curr) => acc + (curr.value + curr.principal), 0)
}
export const totalRepaid = (loans: LoanModel[]) =>{
    const histories = loans.flatMap(l => l.history)
    return histories.reduce((acc, curr) => acc + curr.amount, 0)
}
export const monthDiff = (deadline: string) => (new Date(deadline).getMonth() - new Date().getMonth())??0;

export const daysDiff = (deadline: string) => {
    const month = monthDiff(deadline)
    if(month >= 1) return {text: `${month} month${month > 1 ? "s":""}`, overdue: false}
    const days = Math.abs(Math.floor((new Date(deadline).getTime() - new Date().getTime())/86400000))
    // 86400000 in a day
    console.log(days, " _ ", month, " _ ", deadline)
    return {text: `${Number.isNaN(days)?0:days} day${days > 1?"s":""}`, overdue: days < 1 }
}

export const activePath = (path: string="/", pathname: string) => {
    if((path === "/") && (pathname === path)) return true;
    if(path.replace("/",""))return pathname.replace("/", "").includes(path.replace("/",""))
    return false;
}

export const sumShareValue = (history: ShareHistory[]) => {
    return history.reduce((acc, curr)=>acc+parseFloat(curr.amount.toString()),0)
}

