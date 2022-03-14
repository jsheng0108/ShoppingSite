import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./createProduct.css";
import { useDispatch } from "react-redux";
import { createNewProduct } from "../data_provider/productDetailsDataProvider";
import { v4 as uuidv4 } from "uuid";

const CreateProduct = ({ setIsModalShow }) => {
  const isLoggedIn = useSelector((state) => state.loginState.isLoggedIn);
  const userType = useSelector((state) => state.loginState.userType);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    } else if (userType !== "seller") {
      navigate("/products");
    }
  });

  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();

  const onHandleProductNameInput = (e) => {
    setInputText(e.target.value);
  };

  const [inputProductDescrpition, setInputProductDescrpition] = useState("");
  const onHandlerProductDescription = (e) => {
    setInputProductDescrpition(e.target.value);
  };

  const [inputPrice, setInputPrice] = useState(null);
  const onHandlerPriceInput = (e) => {
    setInputPrice(e.target.value);
  };

  const [inputQuantity, setInputQuantity] = useState(null);
  const onHandlerQuantityInput = (e) => {
    setInputQuantity(e.target.value);
  };

  const [inputImage, setInputImage] = useState("");
  const [previewImage, setPreviewImage] = useState(false);
  const onHandlerImage = (e) => {
    setInputImage(e.target.value);
  };

  const onClickUploadImage = () => {
    setPreviewImage(true);
  };

  const [category, setCategory] = useState("");
  const onHandlerCategory = (e) => {
    setCategory(e.target.value);
  };

  let showPrice = "";

  if (inputPrice !== null) {
    showPrice = "$" + inputPrice;
  }

  const isAddButtonEnabled =
    inputText !== "" &&
    inputProductDescrpition !== "" &&
    inputPrice !== null &&
    inputPrice !== "" &&
    inputQuantity !== null &&
    inputImage !== "" &&
    category !== "";

  const mockAddProductInBackend = async (newProduct) => {
    const existingProducts = localStorage.getItem("products");
    if (existingProducts) {
      const parray = JSON.parse(existingProducts);
      parray.push(newProduct);
      localStorage.setItem("products", JSON.stringify(parray));
    } else {
      localStorage.setItem("products", JSON.stringify([newProduct]));
    }
  };

  const onClickAddProduct = async () => {
    const newProduct = {
      productID: uuidv4(),
      imageSrc: inputImage,
      itemName: inputText,
      category: category,
      price: inputPrice,
      showPrice: showPrice,
      productDesc: inputProductDescrpition,
      timeAdded: Math.floor(Date.now() / 1000),
      quantity: inputQuantity,
    };
    // mock back end call
    await mockAddProductInBackend(newProduct);
    dispatch(createNewProduct(newProduct));
    navigate("/products");
  };

  return (
    <div>
      <h2 className="title">Create Product</h2>
      <div className="createcontainer">
        <p className="text">Product name</p>
        <input onChange={onHandleProductNameInput} />
        <p className="pd">Product Description</p>
        <input onChange={onHandlerProductDescription} />
        <div className="category">
          <span className="text_category">Category</span>
          <span className="text">Price</span>
        </div>
        <div>
          <select className="select" onChange={onHandlerCategory}>
            <option value="null"></option>
            <option value="Apple">Apple</option>
            <option value="Toys">Toys</option>
            <option value="Oculus & related">Oculus & related</option>
            <option value="home">Home</option>
          </select>
          <input onChange={onHandlerPriceInput} />
        </div>
        <div>
          <span className="text_stock">In Stock Quantity</span>
          <span className="text">Add Image Link</span>
        </div>
        <div>
          <input
            className="stock"
            type="number"
            onChange={onHandlerQuantityInput}
          />
          <input onChange={onHandlerImage} />
          <button onClick={onClickUploadImage}>Upload</button>
        </div>
        <div className="preview">
          {previewImage ? <img src={inputImage} className="img" /> : null}
        </div>
        <button disabled={!isAddButtonEnabled} onClick={onClickAddProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;
