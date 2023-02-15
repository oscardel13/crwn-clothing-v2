import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.util"
import { CATEGORY_ACTION_TYPES, Category } from "./category.types"

export type FetchCategoriesStart = Action<
    CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START
>;
export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => {
    return createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START)
})

export type FetchCatrgoriesSucess = ActionWithPayload<
    CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    Category[]
>;
export const fetchCategoriesSuccess = withMatcher((categories: Category[]): FetchCatrgoriesSucess => {
    return createAction(
        CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
        categories
    );
})

export type FetchCatrgoriesFailed = ActionWithPayload<
    CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, 
    Error
>;
export const fetchCategoriesFailed =withMatcher( (error: Error): FetchCatrgoriesFailed => {
    return createAction(
        CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
        error
    )
})

export type CategoryAction = FetchCategoriesStart | FetchCatrgoriesFailed | FetchCatrgoriesSucess