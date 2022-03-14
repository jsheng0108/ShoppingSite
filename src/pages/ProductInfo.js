import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateProductIDToEdit } from "../data_provider/productDetailsDataProvider";
import { useDispatch } from "react-redux";
import "./ProductInfo.css";
import {
  initializeProductStroage,
  addProductByID,
  deleteProductByID,
} from "../data_provider/shoppingCart";

const ProductInfo = () => {
  const products = useSelector((state) => state.productDetails.products);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.loginState.userType);
  const userName = useSelector((state) => state.loginState.userName);
  const productsInCart = useSelector(
    (state) => state.shoppingCart.productsInCart
  );

  const currentProductInfo = products.find(
    (product) => product.productID === id
  );

  let countInCart = 0;
  const productInCart = productsInCart.find(
    (product) => id === product.productID
  );
  if (productInCart) {
    countInCart = productInCart.count;
  }

  useEffect(() => {
    if (!currentProductInfo) {
      navigate("/products");
    }
    dispatch(initializeProductStroage({ userName }));
  }, [userName]);

  const onClickEdit = () => {
    navigate("/editproduct/" + id);
  };

  const onClickAdd = () => {
    dispatch(
      addProductByID({
        productID: currentProductInfo.productID,
        count: 1,
        price: currentProductInfo.price,
        userName,
      })
    );
  };

  const onClickDelete = () => {
    dispatch(
      deleteProductByID({
        productID: currentProductInfo.productID,
        count: 1,
        price: currentProductInfo.price,
        userName,
      })
    );
  };

  return (
    <div>
      {currentProductInfo ? (
        <div className="editpage">
          <div>
            <img src={currentProductInfo.imageSrc} alt="img" />
          </div>
          <div>
            <p>Category: {currentProductInfo.category}</p>
            <h4>{currentProductInfo.itemName}</h4>

            <p>{currentProductInfo.showPrice}</p>
            <p>{currentProductInfo.productDesc}</p>
            {userType === "seller" ? null : countInCart === 0 ? (
              <button onClick={onClickAdd}>Add To Cart</button>
            ) : (
              <>
                <button onClick={onClickAdd}>+</button>
                {countInCart}
                <button onClick={onClickDelete}>-</button>
              </>
            )}

            {userType !== "buyer" ? (
              <button onClick={onClickEdit}>Edit</button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductInfo;
