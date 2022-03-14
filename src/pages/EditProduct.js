import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import "./editproduct.css";
import { editExistingProduct } from "../data_provider/productDetailsDataProvider";
const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.productDetails.products);
  const { id } = useParams();
  const currentProductToEdit = products.find(
    (product) => product.productID === id
  );

  const [inputText, setInputText] = useState(currentProductToEdit.itemName);
  const onHandleProductNameInput = (e) => {
    setInputText(e.target.value);
  };
  const [inputProductDescrpition, setInputProductDescrpition] = useState(
    currentProductToEdit.productDesc
  );
  const onHandlerProductDescription = (e) => {
    setInputProductDescrpition(e.target.value);
  };
  const [inputQuantity, setInputQuantity] = useState(
    currentProductToEdit.quantity
  );
  const onHandlerQuantityInput = (e) => {
    setInputQuantity(e.target.value);
  };

  const [inputImage, setInputImage] = useState(currentProductToEdit.imageSrc);
  const onHandlerImage = (e) => {
    setInputImage(e.target.value);
  };
  const [inputcategory, setInputcategory] = useState(
    currentProductToEdit.category
  );
  const onHandlerCategory = (e) => {
    setInputcategory(e.target.value);
  };

  const onEditProductMOckBackend = async (newProduct) => {
    const existingProducts = localStorage.getItem("products");
    if (existingProducts) {
      const parray = JSON.parse(existingProducts);
      const productToUpdate = parray.find(
        (product) => product.productID === id
      );
      productToUpdate.category = inputcategory;
      productToUpdate.productDesc = inputProductDescrpition;
      productToUpdate.quantity = inputQuantity;
      productToUpdate.imageSrc = inputImage;
      productToUpdate.itemName = inputText;
      productToUpdate.productID = id;
      localStorage.setItem("products", JSON.stringify(parray));
    } else {
      return;
    }
  };

  const onClickSave = async () => {
    const newProduct = {
      productDesc: inputProductDescrpition,
      quantity: inputQuantity,
      imageSrc: inputImage,
      itemName: inputText,
      category: inputcategory,
      productID: id,
    };
    console.log(inputQuantity);
    await onEditProductMOckBackend(newProduct);
    dispatch(editExistingProduct(newProduct));
    navigate("/products");
  };

  return (
    <div>
      <h2 className="title">Edit Product</h2>
      <div className="createcontainer">
        <p className="text">Product name</p>
        <input value={inputText} onChange={onHandleProductNameInput} />
        <p className="pd">Product Description</p>
        <input
          value={inputProductDescrpition}
          onChange={onHandlerProductDescription}
        />
        <div className="category">
          <span className="text_category">Category</span>
          <span className="text">Price</span>
        </div>
        <div>
          <select
            className="select"
            value={inputcategory}
            onChange={onHandlerCategory}
          >
            <option value="null"></option>
            <option value="Apple">Apple</option>
            <option value="Toys">Toys</option>
            <option value="Oculus & related">Oculus & related</option>
            <option value="home">Home</option>
          </select>
          <input value={currentProductToEdit.price} disabled={true} />
        </div>
        <div>
          <span className="text_stock">In Stock Quantity</span>
          <span className="text">Add Image Link</span>
        </div>
        <div>
          <input
            className="stock"
            type="number"
            value={inputQuantity}
            onChange={onHandlerQuantityInput}
          />
          <input value={inputImage} onChange={onHandlerImage} />
          <button>Upload</button>
        </div>
        <div className="preview">
          <img src={inputImage} alt="img" className="img" />
        </div>
        <button onClick={onClickSave}>Save</button>
      </div>
    </div>
  );
};

export default EditProduct;
