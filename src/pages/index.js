import React, { useState } from "react";

import LoginPage from "./Login";
import { Routes, Route } from "react-router-dom";
import { MainProductPage } from "./MainProductPage";
import MainPage from "../components/MainPage";
import CreateProduct from "./createProduct";
import ProductInfo from "./ProductInfo";
import ShoppingCartModal from "../modal/ShoppingCartModal";
import EditProduct from "./EditProduct";

const App = () => {
  const [isModalShow, setIsModalShow] = useState(false);
  const [shoppingCartModalIsShow, setShoppingCartModalIsShow] = useState(false);
  return (
    <>
      <MainPage
        setIsModalShow={setIsModalShow}
        setShoppingCartModalIsShow={setShoppingCartModalIsShow}
      />
      <ShoppingCartModal
        shoppingCartModalIsShow={shoppingCartModalIsShow}
        setShoppingCartModalIsShow={setShoppingCartModalIsShow}
      />
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              isModalShow={isModalShow}
              setIsModalShow={setIsModalShow}
            />
          }
        />
        <Route
          path="products"
          element={<MainProductPage setIsModalShow={setIsModalShow} />}
        />
        <Route path="createproduct" element={<CreateProduct />} />
        <Route path="productinfo/:id" element={<ProductInfo />} />
        <Route path="editproduct/:id" element={<EditProduct />} />
      </Routes>
    </>
  );
};

export default App;
