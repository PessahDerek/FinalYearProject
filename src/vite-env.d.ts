/// <reference types="vite/client" />

import {IconType} from "react-icons";
import {decl} from "postcss";
import {UseMutationResult} from "@tanstack/react-query";


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

declare type Role = 'admin' | 'member';

declare interface UserProfile {
    _id?: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role: Role;
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
    signOut: () => void;
    editProfile?: UseMutationResult<unknown, Error, UserProfile, unknown>;
}
declare type btnType = "prim"|"sec"|"acc"|"outline"|"out-sec"|"out-acc"|"prim-text-btn"|"sec-text-btn"|"acc-text-btn"
    |"white-text-btn" | "prim-under" | "sec-under" | "acc-under"

declare interface LoanHistory {
    amount: number;
    date: string;
}
declare interface LoanModel extends Document {
    _id: string;
    userId: string;
    principal: number;
    value: number;
    deadline: Date;
    interest: number; // is percentage
    penaltyRate: number; // is percentage
    paid: boolean;
    approved: boolean;
    pending: boolean;
    defaulted: boolean;
    history: LoanHistory[];
    createdAt: Date;
}

declare type ShareUpdateMode = 'debit'|'credit'

declare interface ShareHistory {
    amount: number;
    date: Date;
    mode: ShareUpdateMode;
}
declare interface ShareModel {
    _id: string;
    member: UserProfile;
    realValue: number;
    history: ShareHistory[];
}


declare interface MyDataResponse {
    unpaidLoans: LoanModel[];
    paidLoans: LoanModel[];
    pendingLoans: LoanModel[];
    shares: ShareModel|null
}
declare interface ChamaDataResponse{
    unpaidLoans: LoanModel[];
    paidLoans: LoanModel[];
    pendingLoans: LoanModel[];
    members: UserProfile[];
    shares: ShareModel[];
    totalShares: number;
    unverified: UserProfile[]
}

declare interface AppDataContextObj {
    myData: MyDataResponse;
    chamaData: ChamaDataResponse
    fetching: boolean;
}

declare interface ChamaModel{
    name: string;
    interestRate: number;
    penaltyRate: number;
    members: UserProfile[];
    loans: LoanModel[];
    shares: ShareModel[];
}
declare interface RepayObj {
    loanId: string;
    userId: string;
    amount: number;
}
declare interface ShareUpdate {
    shareId: string;
    amount: number;
    mode: 'credit' | 'debit';
}
