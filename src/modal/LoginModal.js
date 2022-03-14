import React, { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeLoginStatus,
  setUserName,
} from "../data_provider/loginDataProvider";
import { initializeProductStroage } from "../data_provider/shoppingCart";

import { personalProjectApi } from "../api/api";

export const LoginModal = ({
  isSignin,
  setIsSignin,
  isModalShow,
  setIsModalShow,
  isUpdatePassword,
  setIsUpdatePassword,
  setShowupdatePasswordText,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailPlaceholder, setEmailPlaceholder] = useState("you@example.com");
  const [passwordPlaceholder, setPasswordPlaceholder] = useState("***********");

  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoginErrorMessage("");
  }, []);

  const dispatch = useDispatch();

  const onClickTrySignUp = () => {
    setIsSignin(false);
  };

  const onClickTrySignIn = () => {
    setIsSignin(true);
  };

  const onClickCloseButton = () => {
    setLoginErrorMessage("");
    setIsModalShow(false);
    setIsUpdatePassword(false);
    setIsSignin(true);
  };

  const onClickForgetPassword = () => {
    setIsUpdatePassword(true);
  };

  const onClickSignIn = () => {
    const result = personalProjectApi.signIn({ email, password });
    result.then(
      (jsonValue) =>
        jsonValue.json().then((data) => {
          setIsModalShow(false);
          dispatch(
            changeLoginStatus({
              isLoggedIn: data.status,
              userType: data.userType,
            })
          );
          dispatch(setUserName(email));
          localStorage.setItem("userName", email);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userType", data.userType);
          dispatch(initializeProductStroage({ userName: email }));
          navigate("/products");
        }),
      (value) => {
        setLoginErrorMessage(value.message);
      }
    );
    // clear login info on modal
    setEmail("");
    setPassword("");
  };

  const onClickUpdatePassword = () => {
    setIsModalShow(false);
    setShowupdatePasswordText(true);
  };

  return (
    <>
      <span>login page</span>
      <Modal show={isModalShow}>
        <Modal.Header closeButton={true} onHide={onClickCloseButton}>
          <Modal.Title>
            {isUpdatePassword
              ? "Updated your password"
              : isSignin
              ? "Sign in to your account"
              : "Sign up an account"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isUpdatePassword ? (
            <div>Enter you email link, we will send you the recovery link</div>
          ) : null}
          {!isUpdatePassword ? (
            <>
              <TextInput
                style={{ width: 600 }}
                label="Email"
                placeholder={emailPlaceholder}
                onChangeValue={setEmail}
                value={email}
                setPlaceHolder={setEmailPlaceholder}
              />
              <br />
              <br />
              <TextInput
                style={{ width: 600 }}
                label="Password"
                placeholder={passwordPlaceholder}
                onChangeValue={setPassword}
                value={password}
                setPlaceHolder={setPasswordPlaceholder}
                isPassword={true}
              />
            </>
          ) : (
            <TextInput
              style={{ width: 600 }}
              label="Email"
              placeholder={emailPlaceholder}
              onChangeValue={setEmail}
              value={email}
              setPlaceHolder={setEmailPlaceholder}
            />
          )}
          <div style={{ marginBottom: "10px", marginTop: "10px" }}>
            {loginErrorMessage !== "" ? <span>{loginErrorMessage}</span> : null}
            {isUpdatePassword ? (
              <Button variant="primary" onClick={onClickUpdatePassword}>
                Updated Password{" "}
              </Button>
            ) : isSignin ? (
              <Button variant="primary" onClick={onClickSignIn}>
                Sign In
              </Button>
            ) : (
              <Button variant="primary">Create account</Button>
            )}
          </div>

          {isUpdatePassword ? (
            ""
          ) : isSignin ? (
            <div>
              <p> Don't have an account?</p>
              <p onClick={onClickTrySignUp}>Sign up</p>
              <p onClick={onClickForgetPassword}>Forget Password</p>
            </div>
          ) : (
            <div>
              <p> Already have an account</p>
              <p onClick={onClickTrySignIn}>Sign in</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
