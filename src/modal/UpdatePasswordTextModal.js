import React from "react";
import { Modal } from "react-bootstrap";
import { BsFillEnvelopeOpenFill } from "react-icons/bs";
import "./UpdatePasswordTextModal.css";

const UpdatePasswordTextModal = ({
  showUpdatePasswordText,
  setShowupdatePasswordText,
  setIsUpdatePassword,
  setIsSignin,
}) => {
  const onClickCloseButton = () => {
    setShowupdatePasswordText(false);
    setIsUpdatePassword(false);
    setIsSignin(true);
  };
  return (
    <>
      <Modal show={showUpdatePasswordText}>
        <Modal.Header closeButton={true} onHide={onClickCloseButton}>
          <Modal.Title>
            <BsFillEnvelopeOpenFill className="Icon" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="Text">
          We have sent the update password link to your eamil, please check
          that!
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdatePasswordTextModal;
