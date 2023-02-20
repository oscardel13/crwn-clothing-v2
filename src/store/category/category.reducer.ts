import { createSlice } from '@reduxjs/toolkit';

export type CategoryItem = {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
}

export type Category = {
    title: string;
    imageUrl? : string;
    items: CategoryItem[];
}

export type CategoryMap = {
    [key: string]: CategoryItem[]
}

export type CategoryState = { 
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error?: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoryState = {
    categories: [],
    isLoading: false,
    error: null
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: CATEGORIES_INITIAL_STATE,
    reducers : {
        fetchCategoriesStart(state) {
            state.isLoading = true
        },
        fetchCategoriesSuccess(state,action){
            state.isLoading = false
            state.categories = action.payload
        },
        fetchCategoriesFailed(state,action){
            state.isLoading = false
            state.error = action.payload
        }

    }
  })
  
  export const { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed } = categoriesSlice.actions;

  export const categoryReducer = categoriesSlice.reducer;

