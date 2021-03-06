import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listProducts } from "../../actions/productActions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import Product from "../Product";
import Rating from "../Rating";
import { prices, ratings } from "../../utils";

export default function SearchScreen(props) {
  const {
    name = "all",
    category = "all",
    brand = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const productBrandList = useSelector((state) => state.productBrandList);
  const {
    loading: loadingBrands,
    error: errorBrands,
    brands,
  } = productBrandList;

  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        brand: brand !== "all" ? brand : "",
        min,
        max,
        rating,
        order,
      }),
    );
  }, [category, brand, dispatch, max, min, name, order, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterBrand = filter.brand || brand;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/brand/${filterBrand}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };
  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>' '</div>
        )}
        <div className="mr-5 mt-5">
          Sort by{" "}
          <select
            value={order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}
            className="btn btn-outline-dark "
          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customer reviews</option>
          </select>
        </div>
      </div>
      <div>
        {console.log()}
        {loadingBrands ? (
          <LoadingBox></LoadingBox>
        ) : errorBrands ? (
          <MessageBox variant="danger">{errorBrands}</MessageBox>
        ) : (
          <ul>
            <li>
              <Link
                className={"all" === brand ? "active" : ""}
                to={getFilterUrl({ brand: "all" })}
              >
                Any
              </Link>
            </li>
            {brands.map((b) => (
              <li key={b}>
                <Link
                  className={b === brand ? "active" : ""}
                  to={getFilterUrl({ brand: b })}
                >
                  {b}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="row top mt-5">
        <div className="col-1 sticky-top ml-5 filter">
          <div>
            <h3 className="refine">Price</h3>
            <ul>
              {prices.map((p) => (
                <li key={p.name} className="hovered  font-small nothov">
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? "active" : ""
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="refine">Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name} className="hovered  font-small nothov">
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? "active" : ""}
                  >
                    <Rating caption={" & up"} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container py-5">
          <div className="row pb-5 mb-4">
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                {products.length === 0 && (
                  <MessageBox>No Product Found</MessageBox>
                )}
                <div className="row center">
                  {products.map((product) => (
                    <Product key={product._id} product={product}></Product>
                  ))}
                </div>
                <div className="row center pagination">
                  {[...Array(pages).keys()].map((x) => (
                    <Link
                      className={x + 1 === page ? "active" : ""}
                      key={x + 1}
                      to={getFilterUrl({ page: x + 1 })}
                    >
                      {x + 1}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
