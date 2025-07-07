import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "./categoriesSlice";
import { fetchCategoriesAPI } from "./categoriesAPI";

function* fetchCategoriesSaga(): Generator<any, void, any> {
  try {
    const categories = yield call(fetchCategoriesAPI);
    yield put(fetchCategoriesSuccess(categories));
  } catch (error: any) {
    yield put(fetchCategoriesFailure(error.message || "Failed to fetch categories"));
  }
}

export function* watchFetchCategories() {
  yield takeLatest(fetchCategoriesStart.type, fetchCategoriesSaga);
}
