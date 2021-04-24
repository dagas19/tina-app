import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../../actions/orderActions";
import { ORDER_CREATE_RESET } from "../../constants/orderConstants";
import CheckoutSteps from "../CheckoutSteps";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0),
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8">
            <div className="container-fluid mt-5">
              <div className="row border p-2">
                <div className="col-4">
                  <strong>Name:</strong>
                  <br />
                  {cart.shippingAddress.fullName}
                </div>
                <div className="col-4">
                  <strong>Address: </strong>
                  <br />
                  {cart.shippingAddress.address},{cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.postalCode},
                  {cart.shippingAddress.country}
                </div>
                <div className="col-4">
                  <strong>Payment Method:</strong>
                  <br />
                  {cart.paymentMethod}
                </div>
              </div>
            </div>
            <div className="container-fluid mt-5 ">
              <div className="row ">
                {cart.cartItems.map((item) => (
                  <div className="col-4">
                    <ul className="fluid">
                      <li key={item.product}>
                        <div className="card">
                          <div>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="img-fluid"
                            />
                          </div>
                          <div className="min-30">
                            <Link to={`product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div>${item.price}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-4 mt-5">
            <div className="container-fluid border rounded">
              <ul>
                <li>
                  <h2 class="summary">Order Summary</h2>
                </li>
                <li>
                  <div className="d-flex justify-content-between">
                    <div>Items</div>
                    <div>${cart.itemsPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="d-flex justify-content-between">
                    <div>Shipping</div>
                    <div>${cart.shippingPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="d-flex justify-content-between">
                    <div>Tax</div>
                    <div>${cart.taxPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong> Order Total</strong>
                    </div>
                    <div>
                      <strong>${cart.totalPrice.toFixed(2)}</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={placeOrderHandler}
                    className="btn btn-warning btn-block btn-lg ml-2 pay-button"
                    disabled={cart.cartItems.length === 0}
                  >
                    Place Order
                  </button>
                </li>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
