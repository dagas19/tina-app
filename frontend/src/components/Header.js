import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

export default function Header() {
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(
      listProducts({
        category: category !== "all" ? category : "",
      }),
    );
  }, [category, dispatch, max, min, name, order, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;

    return `/search/category/${filterCategory}`;
  };
  return (
    <div className="d-flex content-center">
      {loadingCategories ? (
        <LoadingBox></LoadingBox>
      ) : errorCategories ? (
        <MessageBox variant="danger">{errorCategories}</MessageBox>
      ) : (
        <ul className="d-flex content-center">
          {categories.map((c) => (
            <li key={c}>
              <Link
                className={c === category ? "active" : ""}
                to={getFilterUrl({ category: c })}
              >
                {c}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
