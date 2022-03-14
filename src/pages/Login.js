import React, { useState } from "react";
import { LoginModal } from "../modal/LoginModal";

import UpdatePasswordTextModal from "../modal/UpdatePasswordTextModal";

const LoginPage = ({ isModalShow, setIsModalShow }) => {
  const [isSignin, setIsSignin] = useState(true);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const [showUpdatePasswordText, setShowupdatePasswordText] = useState(false);

  return (
    <>
      <LoginModal
        isSignin={isSignin}
        setIsSignin={setIsSignin}
        isModalShow={isModalShow}
        setIsModalShow={setIsModalShow}
        isUpdatePassword={isUpdatePassword}
        setIsUpdatePassword={setIsUpdatePassword}
        setShowupdatePasswordText={setShowupdatePasswordText}
      />
      <UpdatePasswordTextModal
        showUpdatePasswordText={showUpdatePasswordText}
        setShowupdatePasswordText={setShowupdatePasswordText}
        setIsUpdatePassword={setIsUpdatePassword}
        setIsSignin={setIsSignin}
      />
    </>
  );
};

export default LoginPage;
