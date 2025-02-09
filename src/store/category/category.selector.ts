import { createSelector } from "reselect";
import { RootState } from "../store";

import { CategoryState } from "./category.reducer";
import { CategoryMap } from "./category.reducer";

const selectCategoryReducer = (state: RootState): CategoryState => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
    )

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
    return categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    },{} as CategoryMap)
});

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
    );