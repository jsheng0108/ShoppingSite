import { createSlice } from "@reduxjs/toolkit";

export const shoppingcartSlice = createSlice({
  name: "shoppingCart",
  initialState: {
    totalPrice: 0,
    productsInCart: [],
  },

  reducers: {
    initializeProductStroage: (state, data) => {
      const cartData = localStorage.getItem(
        buildCartKey(data.payload.userName)
      );
      if (!cartData) {
        localStorage.setItem(
          buildCartKey(data.payload.userName),
          JSON.stringify({ totalPrice: 0, productsInCart: [] })
        );
      } else {
        const stateInStorage = JSON.parse(cartData);
        state.totalPrice = stateInStorage.totalPrice;
        state.productsInCart = stateInStorage.productsInCart;
      }
    },
    addProductByID: (state, data) => {
      const productInCart = state.productsInCart.find(
        (value) => value.productID === data.payload.productID
      );
      if (productInCart) {
        productInCart.count = productInCart.count + data.payload.count;
      } else {
        state.productsInCart.push({
          productID: data.payload.productID,
          count: data.payload.count,
          price: data.payload.price,
        });
      }
      state.totalPrice =
        state.totalPrice + data.payload.count * data.payload.price;
      localStorage.setItem(
        buildCartKey(data.payload.userName),
        JSON.stringify(state)
      );
    },
    deleteProductByID: (state, data) => {
      let deleteCount = data.payload.count;
      const productInCart = state.productsInCart.find(
        (value) => value.productID === data.payload.productID
      );
      if (productInCart) {
        deleteCount = Math.min(deleteCount, productInCart.count);
        productInCart.count = productInCart.count - deleteCount;
        if (productInCart.count === 0) {
          state.productsInCart = state.productsInCart.filter(
            (value) => value.productID !== data.payload.productID
          );
        }
      } else {
        deleteCount = 0;
      }
      state.totalPrice = state.totalPrice - deleteCount * data.payload.price;
      localStorage.setItem(
        buildCartKey(data.payload.userName),
        JSON.stringify(state)
      );
    },
    deleteAllProductByID: (state, data) => {
      let deleteCount = data.payload.count;
      const productInCart = state.productsInCart.find(
        (value) => value.productID === data.payload.productID
      );
      if (productInCart) {
        deleteCount = Math.min(deleteCount, productInCart.count);
      } else {
        deleteCount = 0;
      }
      state.productsInCart = state.productsInCart.filter(
        (value) => value.productID !== data.payload.productID
      );
      state.totalPrice = state.totalPrice - deleteCount * data.payload.price;
      localStorage.setItem(
        buildCartKey(data.payload.userName),
        JSON.stringify(state)
      );
    },
  },
});

function buildCartKey(userName) {
  return "cart_" + userName;
}

export const {
  addProductByID,
  deleteProductByID,
  deleteAllProductByID,
  initializeProductStroage,
} = shoppingcartSlice.actions;

export default shoppingcartSlice.reducer;
