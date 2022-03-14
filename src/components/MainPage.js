import React from "react";
import { Container, NavbarBrand } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import {
  changeLoginStatus,
  setUserName,
} from "../data_provider/loginDataProvider";

import "./MainPage.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Vector from "../img/Vector.png";
import {
  addProductByID,
  deleteProductByID,
  deleteAllProductByID,
} from "../data_provider/shoppingCart";
import { updateSearchKeywords } from "../data_provider/productDetailsDataProvider";

const MainPage = ({ setIsModalShow, setShoppingCartModalIsShow }) => {
  const onClickSignIn = () => {
    setIsModalShow(true);
  };
  const isLoggedIn = useSelector((state) => state.loginState.isLoggedIn);
  const userName = useSelector((state) => state.loginState.userName);
  const userType = useSelector((state) => state.loginState.userType);
  const totalPrice = useSelector((state) => state.shoppingCart.totalPrice);
  const showPrice = "$" + Math.round(totalPrice * 100) / 100;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickSignOut = () => {
    dispatch(changeLoginStatus(false));
    dispatch(setUserName(""));
    localStorage.removeItem("userName");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    navigate("/");
  };

  const onClickCart = () => {
    if (isLoggedIn) {
      setShoppingCartModalIsShow(true);
    } else {
      setIsModalShow(true);
    }
  };

  const onChangeSearchText = (e) => {
    dispatch(updateSearchKeywords({ searchKeywords: e.target.value }));
  };

  return (
    <Navbar className="NavBar">
      <span className="NavBarText">Management Chuwa</span>
      <input
        style={{ width: 500 }}
        type="search"
        placeholder="Search"
        onChange={onChangeSearchText}
      />
      <div className="userInfo">
        {!isLoggedIn ? (
          <Button variant="outline-secondary" onClick={onClickSignIn}>
            Sign In
          </Button>
        ) : (
          <>
            <span style={{ color: "white", width: "auto" }}>{userName}</span>
            <button onClick={onClickSignOut} style={{ marginLeft: 15 }}>
              Sign out
            </button>
          </>
        )}
        {userType !== "seller" ? (
          <div style={{ marginLeft: 15 }}>
            <img src={Vector} alt="cart" onClick={onClickCart} />
            {isLoggedIn ? <span className="price">{showPrice}</span> : null}
          </div>
        ) : null}
      </div>
    </Navbar>
  );
};

export default MainPage;
