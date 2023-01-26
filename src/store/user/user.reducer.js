import USER_ACTION_TYPES from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
}

// useeReducer way of handling useState
export const userReducer = (state = INITIAL_STATE, action) => {
    /* state is useful to when you what to keep track of incrementing 
    something or need to use it for some other reason or if you want to
    keep previous values in state using ...state
    */
    const {type,payload} = action;
    switch(type) {
        case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
            return {...state, isLoading:true}
        case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
            return {...state, isLoading:true}
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return {...state, currentUser:payload, isLoading:false}
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
            return {...state, error:payload, isLoading:false}
        case USER_ACTION_TYPES.SIGN_OUT_START:
            return {...state, isLoading:true}
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {...state, currentUser:null, isLoading:false}
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
            return {...state, error:payload, isLoading:false}
        case USER_ACTION_TYPES.SIGN_UP_START:
            return {...state, isLoading:true}
        case USER_ACTION_TYPES.SIGN_UP_SUCCESS:
            return {...state, currentUser:payload, isLoading:false}
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
            return {...state, error:payload, isLoading:false}
        default:
            return state;
    }
}

// SIGN_UP_START: 'user/SIGN_UP_START',
// SIGN_UP_SUCCESS: 'user/SIGN_UP_SUCCESS',
// SIGN_UP_FAILED: 'user/SIGN_UP_FAILED',
// SIGN_OUT_START: 'user/SIGN_OUT_START',
// SIGN_OUT_SUCCESS: 'user/SIGN_OUT_SUCCESS',
// SIGN_OUT_FAILED: 'user/SIGN_OUT_FAILED',