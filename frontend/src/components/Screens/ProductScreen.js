import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createReview, detailsProduct } from "../../actions/productActions";
import { PRODUCT_REVIEW_CREATE_RESET } from "../../constants/productConstants";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import Rating from "../Rating";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name }),
      );
    } else {
      alert("Please enter comment and rating");
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="dam">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to shopping</Link>
          <div className="container">
            <div className="row">
              <div className="col-xl-5 col-12 ">
                <img
                  className="img-fluid-prod"
                  src={product.image}
                  alt={product.image}
                />
              </div>
              <div className="col-xl-6 col-12">
                <ul>
                  <li>
                    <h1>{product.name}</h1>
                  </li>
                  <li>
                    <Rating rating={product.rating}></Rating>
                  </li>
                  <li>Color: {product.color}</li>
                  <li>Price : ${product.price}</li>
                  <li>
                    Description:
                    <p>{product.description}</p>
                  </li>
                  <li>
                    <div className="container-fluid p-2">
                      <div className="row">
                        <div className="col-6 ">
                          <div className="mb-2">Price</div>
                          <div className="mb-2">Status: </div>
                          <div className="mb-2">Qty</div>
                        </div>
                        <div className="col-xl-3 col-3">
                          <div className="price mb-2 text-right">
                            ${product.price}
                          </div>
                          <div className="mb-2 text-right">
                            {product.countInStock > 0 ? (
                              <span className="success">In Stock</span>
                            ) : (
                              <span className="danger">Unavailable</span>
                            )}
                          </div>
                          <div className="mb-2 text-right">
                            <select
                              value={qty}
                              className="btn btn-outline-dark"
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ),
                              )}
                            </select>
                          </div>
                        </div>
                        <div className="col-xl-12 col-12">
                          <button
                            onClick={addToCartHandler}
                            className="btn btn-dark btn-block"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h1 id="reviews">Reviews</h1>
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        className="btn btn-outline-dark"
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button
                        className="btn btn-warning btn-block btn-lg ml-2 pay-button"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
