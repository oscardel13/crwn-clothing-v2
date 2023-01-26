import { takeLatest, all, call, put } from "redux-saga/effects"

import { createAuthUserWithEmailPassword,
        signInAuthUserWtihEmailPassword,
        signOutUser,
        signInWithGooglePopup,
        createUserDocumentFromAuth,
        getCurrentUser } from "../../utils/firebase/firebase.utils"

import {       
        signInSuccess,
        signInFailed,
        signOutFailed,
        signOutSuccess,
        signUpFailed, 
        signUpSuccess} from './user.action'

import USER_ACTION_TYPES from "./user.types"

////////////////////////////////////////////////////////////////////////
// CHECK USER SIGN IN AND UPDATE STATE ACCORDENLY

export function* isUserAuthenticated(){
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth,userAuth);

    }
    catch(error){
        yield put(signInFailed(error));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

//////////////////////////////////////////////////////////////////////
// GOOGLE SIGN IN

export function* googleSignInSaga() {
    try{
        const { user } = yield call(signInWithGooglePopup)
        yield call(getSnapshotFromUserAuth,user)
    }
    catch(error){
        yield put(signInFailed(error));
    }
    
}

export function* onGoogleSignIn() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, googleSignInSaga)
}

//////////////////////////////////////////////////////////////////////
// Email and Password Sign In

export function* signInWithEmail({type, payload}){
    try{
        const { user } = yield call(signInAuthUserWtihEmailPassword,
            payload.email,payload.password)
        yield call(getSnapshotFromUserAuth,user)
    }
    catch(error){
        yield put(signInFailed(error));
    }
}

export function* onEmailSignIn() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START,signInWithEmail)
}

//////////////////////////////////////////////////////////////////////
// Sign Out User
export function* signOutAuth() {
    try{
        yield call(signOutUser)
        yield put(signOutSuccess())
    }
    catch(error){
        yield put(signOutFailed(error))
    }
}

export function* onSignOut() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START,signOutAuth)
}
///////////////////////////////////////////////////////////////////////
// Sign Up User

export function* signUpUser({type, payload}) {
    try{
        const { user } = yield call(createAuthUserWithEmailPassword,
        payload.email,payload.password)
        yield put(signUpSuccess(user, {displayName: payload.displayName}))
    }
    catch(error){
        yield put(signUpFailed(error))
    }
} 

export function* onSignUp() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpUser)
}

export function* signUpSuccessSaga({ payload: { user, additionalDetails } }){
    yield call(getSnapshotFromUserAuth,user, additionalDetails)
}

export function* onSignUpSuccess(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signUpSuccessSaga)
}

///////////////////////////////////////////////////////////////////////

export function* getSnapshotFromUserAuth(userAuth, additionalDetails){
    try{
        const userSnapshot = yield call(createUserDocumentFromAuth,userAuth, additionalDetails);
        const user = {id:userSnapshot.id, ...userSnapshot.data()}
        yield put(signInSuccess(user))
    }   
    catch(error) {
        yield put(signInFailed(error));
    }
}

export function* userSagas() {
    yield all([call(onCheckUserSession),call(onGoogleSignIn), call(onSignOut), call(onSignUp),call(onEmailSignIn)])
}