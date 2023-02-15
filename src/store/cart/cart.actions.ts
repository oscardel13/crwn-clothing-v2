import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.util"
import { CategoryItem } from "../category/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";


//////////////////////////////////////////////////////////////////////////////////////////
//Helper functions 
const addCartItem = (cartItems:CartItem[], productToAdd:CategoryItem): CartItem[] => {
    const cartItemExist = cartItems.find((cartItem)=>
        cartItem.id === productToAdd.id
    );

    if (cartItemExist) {
        return cartItems.map(cartItem => {
            if (cartItem.id === productToAdd.id){
                cartItem.quantity += 1
            }
            return cartItem
        })
    }

    return [...cartItems, {...productToAdd, quantity:1 }];
}; 

const clearItemCart = (cartItems:CartItem[],itemToRemove:CartItem): CartItem[] => {
    if (cartItems && cartItems.length> 0)
    return cartItems.filter( item => item!==itemToRemove)
    return cartItems
};

const removeCartItem = (cartsItem:CartItem[],cartItemToRemove:CartItem): CartItem[] =>{
    const existingCartItem = cartsItem.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
      );

    if (existingCartItem && existingCartItem.quantity==1) return cartsItem.filter(item=>item!==cartItemToRemove)
    
    return cartsItem.map( item => {
        if (item.id === cartItemToRemove.id) item.quantity-=1
        return item
    });
}

export type SetIsCartOpen = Action<CART_ACTION_TYPES.SET_IS_CART_OPEN>

export type SetCartItem = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEM, CartItem[]>

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItem => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEM,cartItems)
})

export const setIsCartOpen = withMatcher((): SetIsCartOpen => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,{})
})

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem): SetCartItem => {
    const updatedCart = addCartItem(cartItems, productToAdd)
    return setCartItems(updatedCart)
}

export const clearItemFromCart = (cartItems: CartItem[], itemToRemove: CartItem):SetCartItem => {
    const updatedCart = clearItemCart(cartItems,itemToRemove)
    return setCartItems(updatedCart)
}

export const removeItemFromCart = (cartItems: CartItem[], itemToChange:CartItem):SetCartItem => {
    const updatedCart = removeCartItem(cartItems,itemToChange)
    return setCartItems(updatedCart)
}

