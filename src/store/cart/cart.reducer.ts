import { createSlice } from '@reduxjs/toolkit';

import { addCartItem, removeCartItem, clearCartItem } from './cart.helper';

import { CategoryItem } from "../category/category.reducer";

export type CartItem = CategoryItem & {quantity:number;}

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[]
}

export const CART_INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
}


export const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    setIsCartOpen(state) {
      state.isCartOpen = !state.isCartOpen
    },
    addItemToCart(state, action) {
      state.cartItems = addCartItem(state.cartItems, action.payload)
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeCartItem(state.cartItems, action.payload)
    },
    clearItemFromCart(state, action) {
      state.cartItems = clearCartItem(state.cartItems, action.payload)
    }
  }
})

export const { setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;