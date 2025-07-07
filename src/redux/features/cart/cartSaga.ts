import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { CartItem } from "../../../lib/types";
import {
  addToCart,
  clearCart,
  hydrateCart,
  removeFromCart,
  updateQuantity,
} from "./cartSlice";
import { loadCartFromLocalStorage, saveCartToLocalStorage } from "./cartUtils";

const selectCartItems = (state: any): CartItem[] => state.cart.items;

function* persistCart() {
  const cart: CartItem[] = yield select(selectCartItems);
  yield call(saveCartToLocalStorage, cart);
}

function* loadCartOnStore() {
  const localCart: CartItem[] = yield call(loadCartFromLocalStorage);
  if (localCart.length > 0) {
    yield put(hydrateCart(localCart));
  }
}

export default function* cartSaga() {
  yield all([
    call(loadCartOnStore),
    takeEvery(
      [
        addToCart.type,
        removeFromCart.type,
        updateQuantity.type,
        clearCart.type,
      ],
      persistCart
    ),
  ]);
}
