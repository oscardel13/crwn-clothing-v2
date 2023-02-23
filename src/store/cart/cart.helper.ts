import { CategoryItem } from "../category/category.reducer";
import { CartItem } from "./cart.reducer";


//////////////////////////////////////////////////////////////////////////////////////////
//Helper functions 
export const addCartItem = (cartItems:CartItem[], productToAdd:CategoryItem): CartItem[] => {
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

export const clearCartItem = (cartItems:CartItem[],itemToRemove:CartItem): CartItem[] => {
    if (cartItems && cartItems.length> 0){
    console.log("here")
    return cartItems.filter( item => item.id!==itemToRemove.id)
    }
    return cartItems
};

export const removeCartItem = (cartsItem:CartItem[],cartItemToRemove:CartItem): CartItem[] =>{
    const existingCartItem = cartsItem.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
      );

    if (existingCartItem && existingCartItem.quantity==1) return cartsItem.filter(item=>item!==cartItemToRemove)
    
    return cartsItem.map( item => {
        if (item.id === cartItemToRemove.id) item.quantity-=1
        return item
    });
}