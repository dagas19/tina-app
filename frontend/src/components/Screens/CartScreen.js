import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import MessageBox from "../MessageBox";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkOutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8 col-md-8 col-sm-12 col-12">
          <div className="container-fluid">
            <h1>Shopping Cart</h1>
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            {cartItems.length === 0 ? (
              <MessageBox>
                Cart is empty. <Link to="/">Go Shopping</Link>
              </MessageBox>
            ) : (
              <ul>
                {cartItems.map((item) => (
                  <li key={item.product}>
                    <div className="row">
                      <div className="col-xl-2 col-lg-4  col-md-4 col-sm-4 col-12">
                        <div className="mr-1">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="rounded img-fluid-cart"
                            width="200"
                          ></img>
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-3">
                        <span className="font-weight-bold">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </span>
                        <div className="d-flex flex-row product-desc">
                          <div class="size mr-1">
                            <span class="text-grey prod-desc">Size:</span>
                            <span class="font-weight-bold prod-desc">
                              &nbsp;M
                            </span>
                          </div>
                          <div class="color">
                            <span class="text-grey prod-desc">Color:</span>
                            <span class="font-weight-bold prod-desc">
                              &nbsp;Grey
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-1  col-md-1 col-sm-1 col-3">
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value)),
                            )
                          }
                          className="btn btn-dark"
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-xl-2 col-lg-1 col-md-1 col-sm-1 col-3 ">
                        <h5 className="text-grey">${item.price}</h5>
                      </div>
                      <div className="col-xl-2 col-lg-1 col-md-1 col-sm-1 col-3">
                        <button
                          type="button"
                          onClick={() => removeFromCartHandler(item.product)}
                          className="btn btn-dark"
                        >
                          <i class="fa fa-trash mb-1 text-danger"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="col-4 col-md-4 col-sm-12 col-12">
          <div className="card card-body">
            <ul>
              <li>
                <h2>
                  Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
                  ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h2>
              </li>
              <li>
                <button
                  type="button"
                  onClick={checkOutHandler}
                  className="btn btn-warning btn-block btn-lg ml-2 pay-button"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
