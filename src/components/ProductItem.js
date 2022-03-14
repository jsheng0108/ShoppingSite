import React from "react";
import "./ProductItem.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductByID,
  deleteProductByID,
} from "../data_provider/shoppingCart";
import { deleteProductByIDFromProducts } from "../data_provider/productDetailsDataProvider";

const ProductItem = ({ imageSrc, itemName, price, productID, priceNum }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.loginState.userType);
  const userName = useSelector((state) => state.loginState.userName);

  const allProductsInCart = useSelector(
    (state) => state.shoppingCart.productsInCart
  );

  let countInCart = 0;

  const itemInCart = allProductsInCart.find(
    (value) => value.productID === productID
  );
  if (itemInCart) {
    countInCart = itemInCart.count;
  }

  const onClickEditButton = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    navigate("/editproduct/" + productID);
  };
  const onClickAddToCartButton = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const count = 1;
    dispatch(addProductByID({ productID, count, price: priceNum, userName }));
  };

  const onClickItem = () => {
    navigate("/productinfo/" + productID);
  };

  const onClickDeleteButton = () => {
    dispatch(deleteProductByIDFromProducts({ productID }));
  };

  return (
    <>
      <div className="productItemContanier" onClick={onClickItem}>
        <div>
          <img src={imageSrc} alt="new" className="productImage" />
        </div>
        <div className="productDesc">
          <div className="productName">{itemName}</div>
          <div>{price}</div>
          <div>
            {userType !== "buyer" ? null : countInCart === 0 ? (
              <button className="buttons" onClick={onClickAddToCartButton}>
                Add
              </button>
            ) : (
              <>
                <button
                  onClick={(e) => {
                    if (e && e.stopPropagation) e.stopPropagation();
                    dispatch(
                      addProductByID({
                        productID: itemInCart.productID,
                        count: 1,
                        price: parseFloat(itemInCart.price),
                        userName,
                      })
                    );
                  }}
                >
                  +
                </button>{" "}
                {countInCart}{" "}
                <button
                  onClick={(e) => {
                    if (e && e.stopPropagation) e.stopPropagation();
                    dispatch(
                      deleteProductByID({
                        productID: itemInCart.productID,
                        count: 1,
                        price: parseFloat(itemInCart.price),
                        userName,
                      })
                    );
                  }}
                >
                  -
                </button>
              </>
            )}

            {userType !== "buyer" ? (
              <div>
                {" "}
                <button onClick={onClickEditButton}>Edit</button>{" "}
                <button onClick={onClickDeleteButton}>Delete</button>{" "}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
