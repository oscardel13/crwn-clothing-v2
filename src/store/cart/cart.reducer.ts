import { AnyAction } from 'redux';

import {CartItem} from "./cart.types"

import { setIsCartOpen,setCartItems } from './cart.actions';

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[]
}

export const INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
}

export const cartReducer = (state = INITIAL_STATE, action: AnyAction) => {
    if (setIsCartOpen.match(action)){
        return {...state, isCartOpen: !state.isCartOpen}
    }
    if (setCartItems.match(action)){
        return{
            ...state,
            cartItems: action.payload,
        } 
    }
    return state
}