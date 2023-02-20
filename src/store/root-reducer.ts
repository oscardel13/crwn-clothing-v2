import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user/user.reducer"; 
import { categoryReducer } from "./category/category.reducer";
import { cartReducer } from './cart/cart.reducer'

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoryReducer,
    cart: cartReducer
});