import { createSlice } from '@reduxjs/toolkit';
import { UserData } from "../../utils/firebase/firebase.utils"
import { User } from "firebase/auth"

export type UserWithID = UserData & {id: string}

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

export const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers : {
        checkUserSession(){},
        googleSignInStart(state) {
            state.isLoading = true
        },
        emailSignInStart(state, action) {
            state.isLoading = true
        },
        signUpStart(state,action) {
            state.isLoading = true
        },
        signOutStart(state) {
            state.isLoading = true
        },
        signInSuccess(state,action){
            state.currentUser = action.payload
            state.isLoading = false
        },
        signOutSuccess(state){
            state.currentUser = null
            state.isLoading = false
        },
        signInFailed(state,action){
            state.error = action.payload
            state.isLoading = false
        }
    }
  
  })
  
  export const { checkUserSession, googleSignInStart, emailSignInStart, signUpStart, signOutStart, signInSuccess, signOutSuccess, signInFailed } = userSlice.actions;
  export const userReducer = userSlice.reducer;