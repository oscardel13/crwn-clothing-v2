import { takeLatest, all, call, put } from "typed-redux-saga/macro"

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"
import { fetchCategoriesSuccess, fetchCategoriesFailed, fetchCategoriesStart } from "./category.reducer"

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield* call(getCategoriesAndDocuments);
        yield* put(fetchCategoriesSuccess(categoriesArray));
    }
    catch (error){
        yield* put(fetchCategoriesFailed(error as Error));
    }
}

export function* onFetchCategories() {
    yield* takeLatest(fetchCategoriesStart, fetchCategoriesAsync);
}

export function* categoriesSaga() {
    yield* all([call(onFetchCategories)]);
}