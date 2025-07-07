import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFailure,
} from "./productSlice";
import { fetchProductAPI } from "./productAPI";

function* fetchProductSaga(): Generator<any, void, any> {
  try {
    const product = yield call(fetchProductAPI);
    yield put(fetchProductSuccess(product));
  } catch (error: any) {
    yield put(fetchProductFailure(error.message || "Failed to fetch product"));
  }
}

export function* watchFetchProduct() {
  yield takeLatest(fetchProductStart.type, fetchProductSaga);
}
