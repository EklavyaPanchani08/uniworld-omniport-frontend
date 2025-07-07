import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "./productsSlice";
import { fetchProductsAPI } from "./productsAPI";

function* fetchProductsSaga(): Generator<any, void, any> {
  try {
    const products = yield call(fetchProductsAPI);
    yield put(fetchProductsSuccess(products));
  } catch (error: any) {
    yield put(fetchProductsFailure(error.message || "Failed to fetch products"));
  }
}

export function* watchFetchProducts() {
  yield takeLatest(fetchProductsStart.type, fetchProductsSaga);
}
