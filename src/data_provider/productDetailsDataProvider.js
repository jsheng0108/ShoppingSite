import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "productDetails",
  initialState: {
    products: localStorage.getItem("products")
      ? JSON.parse(localStorage.getItem("products"))
      : [],
    searchKeywords: "",
  },
  reducers: {
    createNewProduct: (state, newProduct) => {
      state.products.push(newProduct.payload);
    },
    editExistingProduct: (state, data) => {
      const productToEdit = state.products.find(
        (value) => value.productID === data.payload.productID
      );
      if (productToEdit) {
        productToEdit.productDesc = data.payload.productDesc;
        productToEdit.quantity = data.payload.quantity;
        productToEdit.imageSrc = data.payload.imageSrc;
        productToEdit.itemName = data.payload.itemName;
        productToEdit.category = data.payload.category;
      }
    },
    priceLowToHigh: (state) => {
      state.products = state.products.sort((p1, p2) => p1.price - p2.price);
    },
    priceHighToLow: (state) => {
      state.products = state.products.sort((p1, p2) => p2.price - p1.price);
    },
    timeAdded: (state) => {
      state.products = state.products.sort(
        (p1, p2) => p1.timeAdded - p2.timeAdded
      );
    },
    updateSearchKeywords: (state, data) => {
      state.searchKeywords = data.payload.searchKeywords;
    },
    deleteProductByIDFromProducts: (state, data) => {
      state.products = state.products.filter(
        (product) => product.productID !== data.payload.productID
      );
    },
  },
});

export const {
  createNewProduct,
  priceLowToHigh,
  priceHighToLow,
  timeAdded,
  editExistingProduct,
  updateSearchKeywords,
  deleteProductByIDFromProducts,
} = productSlice.actions;

export default productSlice.reducer;
