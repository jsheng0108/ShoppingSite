import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./productContianer.css";
import ProductItem from "../components/ProductItem";
import { useDispatch } from "react-redux";
import {
  priceLowToHigh,
  priceHighToLow,
  timeAdded,
} from "../data_provider/productDetailsDataProvider";
import { initializeProductStroage } from "../data_provider/shoppingCart";
import ReactPaginate from "react-paginate";

export const MainProductPage = ({ setIsModalShow }) => {
  const isLoggedIn = useSelector((state) => state.loginState.isLoggedIn);
  const userType = useSelector((state) => state.loginState.userType);
  const products = useSelector((state) => state.productDetails.products);
  const searchKeywords = useSelector(
    (state) => state.productDetails.searchKeywords
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.loginState.userName);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      setIsModalShow(true);
    }
    dispatch(initializeProductStroage({ userName }));
    const endOffset = itemOffset + itemsPerPage;
    const searchedProduct = products.filter((product) => {
      if (searchKeywords === "") {
        // if search word is empty, skip filter
        return true;
      } else {
        return product.itemName
          .toLowerCase()
          .includes(searchKeywords.toLowerCase());
      }
    });
    setCurrentItems(searchedProduct.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(searchedProduct.length / itemsPerPage));
  }, [
    products,
    itemsPerPage,
    userName,
    isLoggedIn,
    itemOffset,
    searchKeywords,
  ]);

  const onSelectProductFilter = (e) => {
    if (e.target.value === "LastAdded") {
      dispatch(timeAdded());
    } else if (e.target.value === "Pricelowtohigh") {
      dispatch(priceLowToHigh());
    } else {
      dispatch(priceHighToLow());
    }
  };

  const onClickAddProductItem = () => {
    navigate("/createproduct");
  };

  const onClickPage = (e) => {
    const newOffset = (e.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };
  return (
    <div>
      <div className="container">
        <span className="title">Products</span>
        <div>
          <select className="dropdown" onChange={onSelectProductFilter}>
            <option value="LastAdded">Last Added</option>
            <option value="Pricelowtohigh">Price: low to high</option>
            <option value="Pricehightolow">Price: high to low</option>
          </select>
          {userType !== "buyer" ? (
            <button onClick={onClickAddProductItem}>Add Products</button>
          ) : null}
        </div>
      </div>
      <div className="productPage">
        <div className="productList">
          {currentItems.length === 0 ? (
            <div>No product found from your Search, please try again!</div>
          ) : (
            currentItems.map((product, index) => (
              <ProductItem
                className="item"
                key={index}
                productID={product.productID}
                imageSrc={product.imageSrc}
                itemName={product.itemName}
                price={product.showPrice}
                priceNum={product.price}
              />
            ))
          )}
        </div>
        <div className="paginationBlock">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={onClickPage}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      </div>
    </div>
  );
};
