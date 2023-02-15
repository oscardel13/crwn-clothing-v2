import { AnyAction } from 'redux';

import { USER_ACTION_TYPES } from "./user.types";

import { UserWithID, checkUserSession ,googleSignInStart, emailSignInStart, signInFailed, signInSuccess, signOutFailed, signOutStart, signOutSuccess, signUpFailed, signUpStart, signUpSuccess } from "./user.action";

export type UserState = {
    readonly currentUser?: UserWithID | null;
    readonly isLoading: boolean;
    readonly error?:Error | null;
}

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
}

// useeReducer way of handling useState
export const userReducer = (state = INITIAL_STATE, action: AnyAction): UserState => {
    if (signInSuccess.match(action)){
        return {...state, currentUser:action.payload, isLoading:false}
    }
    if (signOutSuccess.match(action)){
        return {...state, currentUser:null, isLoading:false}
    }
    if (signInFailed.match(action) || signOutFailed.match(action) || signUpFailed.match(action)){
        return {...state, error:action.payload, isLoading:false}
    }
    
    return state;
}