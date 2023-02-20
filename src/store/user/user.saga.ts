import { User } from "firebase/auth";
import { takeLatest, all, call, put } from "typed-redux-saga/macro"

import { createAuthUserWithEmailPassword,
        signInAuthUserWtihEmailPassword,
        signOutUser,
        signInWithGooglePopup,
        createUserDocumentFromAuth,
        getCurrentUser, 
        AdditionalInfromation} from "../../utils/firebase/firebase.utils"
import { ActionWithPayload } from "../../utils/reducer/reducer.util";

import {   
    checkUserSession,    
    googleSignInStart,
    emailSignInStart,
    signUpStart,
    signOutStart,
    signInSuccess, 
    signOutSuccess,
    signInFailed
} from './user.reducer'

export type EmailSignInStart = ActionWithPayload<{email:string,password:string}>

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInfromation){
    try{
        const userSnapshot = yield* call(createUserDocumentFromAuth,userAuth, additionalDetails);
        if (userSnapshot){
            if (userSnapshot.data()){
                const {email, displayName} = userSnapshot.data()
                const user = {id:userSnapshot.id, email, displayName }
                yield* put(signInSuccess(user))
            }
            else{
                if (additionalDetails){
                    const user = {id:userSnapshot.id, email:userAuth.email, displayName: additionalDetails.displayName }
                    yield* put(signInSuccess(user))
                }
                else {
                    const user = {id:userAuth.uid, email:userAuth.email, displayName: userAuth.displayName }
                    yield* put(signInSuccess(user))
                };
            }
           
        } 
    }   
    catch(error) {
        yield* put(signInFailed(error as Error));
    }
}

////////////////////////////////////////////////////////////////////////
// CHECK USER SIGN IN AND UPDATE STATE ACCORDENLY

export function* isUserAuthenticated(){
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;
        yield* call(getSnapshotFromUserAuth,userAuth);

    }
    catch(error){
        yield* put(signInFailed(error as Error));
    }
}

export function* onCheckUserSession() {
    yield* takeLatest(checkUserSession, isUserAuthenticated)
}

//////////////////////////////////////////////////////////////////////
// GOOGLE SIGN IN

export function* googleSignInSaga() {
    try{
        const { user } = yield* call(signInWithGooglePopup)
        yield* call(getSnapshotFromUserAuth,user)
    }
    catch(error){
        yield* put(signInFailed(error as Error));
    }    
}

export function* onGoogleSignIn() {
    yield* takeLatest(googleSignInStart, googleSignInSaga)
}

//////////////////////////////////////////////////////////////////////
// Email and Password Sign In

export function* signInWithEmail(action : EmailSignInStart){
    const { payload } = action
    try{
        const { user } = yield call(signInAuthUserWtihEmailPassword,
            payload.email,payload.password)
        yield* call(getSnapshotFromUserAuth,user)
    }
    catch(error){
        yield* put(signInFailed(error as Error));
    }
}

export function* onEmailSignIn() {
    yield* takeLatest(emailSignInStart,signInWithEmail)
}

//////////////////////////////////////////////////////////////////////
// Sign Out User
export function* signOutAuth() {
    try{
        yield* call(signOutUser)
        yield* put(signOutSuccess())
    }
    catch(error){
        yield* put(signInFailed(error as Error))
    }
}

export function* onSignOut() {
    yield* takeLatest(signOutStart,signOutAuth)
}
///////////////////////////////////////////////////////////////////////
// Sign Up User

export type SignUpStartProps = {
    email: string;
    password: string;
    displayName: string;
  }

export type SignUpStart = ActionWithPayload<SignUpStartProps>

export function* signUpUser({payload}: SignUpStart) {
    try{
        const userCred = yield* call(createAuthUserWithEmailPassword,
        payload.email,payload.password)
        if (userCred){
            const user = userCred.user
            yield* call(getSnapshotFromUserAuth,user, {displayName: payload.displayName})
        }
    }
    catch(error){
        yield* put(signInFailed(error as Error))
    }
} 

export function* onSignUp() {
    yield* takeLatest(signUpStart, signUpUser)
}

export type SignUpStartPaylaod = {
    user: User,
    additionalDetails?: AdditionalInfromation
}

export type SignUpSuccess = ActionWithPayload<SignUpStartPaylaod>


///////////////////////////////////////////////////////////////////////

export function* userSagas() {
    yield* all([call(onCheckUserSession),call(onGoogleSignIn), call(onSignOut), call(onSignUp),call(onEmailSignIn)])
}