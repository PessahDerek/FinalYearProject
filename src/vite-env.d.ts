/// <reference types="vite/client" />

import {IconType} from "react-icons";
import {decl} from "postcss";


declare type PathObj = {
    name: string;
    icon?: IconType;
} & (
    {
        path: string;
        action?: undefined;
    } |
    {
        path?: undefined;
        action: (args?: never) => never | void;
    }
    )

declare interface UserProfile {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}
declare interface LoginDetails {
    identifier: string ; // name | phone | email
    password: string;
}
declare  interface AuthResponse {
    profile?: UserProfile;
    token?: string;
    message?: string;
}
declare interface SignupDetails extends LoginDetails, UserProfile {
    confirmPassword: string;
    identifier?: undefined;
}
declare interface AuthContextObj {
    profile?: UserProfile;
    loggedIn: boolean;
    isSigningIn: boolean;
    signIn: (details: LoginDetails) =>void;
    signup: (details: SignupDetails)=>void;
}
declare type btnType = "prim"|"sec"|"red"|"outline"|"out-sec"|"out-acc"|"prim-text-btn"|"sec-text-btn"|"acc-text-btn"
    |"white-text-btn" | "prim-under" | "sec-under" | "acc-under"

declare interface LoanModel {
    _id: string;
    userId: string;
    principal: number;
    value: number;
    deadline: Date;
    interest: number; // is percentage
    penaltyRate: number; // is percentage
    paid: boolean;
    approved: boolean;
}

declare type ShareUpdateMode = 'debit'|'credit'

declare interface ShareHistory {
    amount: number;
    date: Date;
    mode: ShareUpdateMode;
}
declare interface ShareModel {
    member: UserProfile;
    realValue: number;
    history: ShareHistory[];
}

declare interface MyDataResponse {
    unpaidLoans: LoanModel[];
    paidLoans: LoanModel[];
    shares: ShareModel|null
}
declare interface ChamaDataResponse{
    unpaidLoans: LoanModel[],
    paidLoans: LoanModel[],
    members: UserProfile[]
    shares: number
}

declare interface AppDataContextObj {
    myData: MyDataResponse;
    chamaData: ChamaDataResponse
    fetching: boolean;
}
