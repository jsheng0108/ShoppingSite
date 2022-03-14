import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  addProductByID,
  deleteProductByID,
  deleteAllProductByID,
} from "../data_provider/shoppingCart";
import { useDispatch } from "react-redux";
import { initializeProductStroage } from "../data_provider/shoppingCart";

const ShoppingCartModal = ({
  shoppingCartModalIsShow,
  setShoppingCartModalIsShow,
}) => {
  const onClickCloseButton = () => {
    setShoppingCartModalIsShow(false);
  };
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productDetails.products);
  const productsInCart = useSelector(
    (state) => state.shoppingCart.productsInCart
  );
  const userName = useSelector((state) => state.loginState.userName);

  const totalPrice = useSelector((state) => state.shoppingCart.totalPrice);

  const showPrice = "$" + Math.round(totalPrice * 100) / 100;

  useEffect(() => {
    dispatch(initializeProductStroage({ userName }));
  }, [userName]);

  return (
    <>
      <Modal show={shoppingCartModalIsShow}>
        <Modal.Header closeButton={true} onHide={onClickCloseButton}>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsInCart.map((pc, index) => {
            const pid = pc.productID;
            const count = pc.count;
            const price = pc.price;
            const showPrice = "$" + price;
            const productDetail = products.find((pro) => pro.productID === pid);
            return (
              <div key={index}>
                <div>
                  <h6>{productDetail.itemName}</h6>
                  <img
                    src={productDetail.imageSrc}
                    alt="new"
                    className="productImage"
                  />
                  <h6>price: {showPrice}</h6>
                  <button
                    onClick={() => {
                      dispatch(
                        addProductByID({
                          productID: pid,
                          count: 1,
                          price,
                          userName,
                        })
                      );
                    }}
                  >
                    +
                  </button>
                  <span>{count}</span>
                  <button
                    onClick={() => {
                      dispatch(
                        deleteProductByID({
                          productID: pid,
                          count: 1,
                          price,
                          userName,
                        })
                      );
                    }}
                  >
                    -
                  </button>
                  <button
                    onClick={() => {
                      dispatch(
                        deleteAllProductByID({
                          productID: pid,
                          count,
                          price,
                          userName,
                        })
                      );
                    }}
                  >
                    remove
                  </button>
                </div>
                {index < productsInCart.length - 1 ? <hr /> : null}
              </div>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <h6>subtotal</h6>
          <h6>{showPrice}</h6>
          <h6>Tax</h6>
          <h6>Discount</h6>
          <h6>Estimated Total</h6>
          <Button variant="primary">Continue to Check Out</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShoppingCartModal;
