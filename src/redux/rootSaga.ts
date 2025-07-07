import { all } from "redux-saga/effects";
import { watchFetchProducts } from "./features/products/productsSaga";
import { watchFetchCategories } from "./features/category/categoriesSaga";
import { watchFetchProduct } from "./features/product/productSaga";
import cartSaga from "./features/cart/cartSaga";

export default function* rootSaga() {
  yield all([
    watchFetchProducts(),
    watchFetchProduct(),
    watchFetchCategories(),
    cartSaga()
  ]);
}