import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../data_provider/loginDataProvider";
import productSlice from "../data_provider/productDetailsDataProvider";
import shoppingcartSlice from "../data_provider/shoppingCart";

export default configureStore({
  reducer: {
    loginState: loginSlice,
    productDetails: productSlice,
    shoppingCart: shoppingcartSlice,
  },
});
