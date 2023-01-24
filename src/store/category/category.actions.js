import { createAction } from "../../utils/reducer/reducer.util"
import CATEGORY_ACTION_TYPES from "./category.types"

export const setCategories = (categories) => {
    return createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES,categories)
}

export const fetchCategoriesStart = () => {
    return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START)
}

export const fetchCategoriesSuccess = (categories) => {
    return createAction(
        CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
        categories
    );
}

export const fetchCategoriesFailed = (error) => {
    return createAction(
        CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
        error
    )
}
