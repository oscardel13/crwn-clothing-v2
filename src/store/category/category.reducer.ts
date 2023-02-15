import { AnyAction } from 'redux';

import { Category, CATEGORY_ACTION_TYPES } from './category.types'

import { CategoryAction, fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess } from './category.actions';

export type CategoryState = { 
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error?: Error | null;
}

export const INITIAL_STATE: CategoryState = {
    categories: [],
    isLoading: false,
    error: null
}

export const categoryReducer = (
    state = INITIAL_STATE, 
    action: AnyAction
    ): CategoryState => {
    if(fetchCategoriesStart.match(action)){
        return {...state, isLoading: true}
    }
    if(fetchCategoriesSuccess.match(action)){
        return {...state, categories: action.payload, isLoading: false}
    }
    if(fetchCategoriesFailed.match(action)){
        return {...state, error: action.payload, isLoading: false}
    }
    return state
    // switch(action.type) {
    //     case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START:
    //         return {...state, isLoading: true}
    //     case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
    //         return {
    //             ...state, categories: action.payload, isLoading: false}
    //     case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
    //         return {
    //             ...state, error: action.payload, isLoading: false}
    //     default:
    //         return state;
    // };
}