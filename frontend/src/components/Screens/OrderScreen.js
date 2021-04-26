import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deliverOrder,
  detailsOrder,
  payOrder,
} from "../../actions/orderActions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../../constants/orderConstants";

export default function OrderScreen(props) {
  const dispatch = useDispatch();
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8">
            <ul>
              <li>
                <div className="container-fluid mt-5">
                  <div className="row border">
                    <div className="col-4">
                      <strong>Name:</strong>
                      <br />
                      {order.shippingAddress.fullName}
                    </div>
                    <div className="col-4">
                      <p>
                        <strong>Address: </strong>
                        <br />
                        {order.shippingAddress.address},
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.postalCode},
                        {order.shippingAddress.country}
                      </p>
                      {order.isDelivered ? (
                        <MessageBox variant="success">
                          Delivered at {order.deliveredAt}
                        </MessageBox>
                      ) : (
                        <MessageBox variant="danger">Not Delivered</MessageBox>
                      )}
                    </div>
                    <div className="col-4">
                      <p>
                        <strong>Payment Method:</strong>
                        <br />
                        {order.paymentMethod}
                      </p>
                      {order.isPaid ? (
                        <MessageBox variant="success">
                          Paid at {order.paidAt}
                        </MessageBox>
                      ) : (
                        <MessageBox variant="danger">Not Paid</MessageBox>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div className="container-fluid">
              <div className="row">
                <div className="col-4"></div>
              </div>
            </div>
            <div className="container-fluid mt-5 ">
              <div className="row ">
                <ul>
                  {order.orderItems.map((item) => (
                    <div className="col-4">
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
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-4 mt-5">
            <div className="container-fluid border rounded">
              <ul>
                <li>
                  <h2>Order Summary</h2>
                </li>
                <li>
                  <div className="d-flex justify-content-between">
                    <div>Items</div>
                    <div>${order.itemsPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="d-flex justify-content-between">
                    <div>Shipping</div>
                    <div>${order.shippingPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="d-flex justify-content-between">
                    <div>Tax</div>
                    <div>${order.taxPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong> Order Total</strong>
                    </div>
                    <div>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </div>
                  </div>
                </li>
                {!order.isPaid && (
                  <li>
                    {!sdkReady ? (
                      <LoadingBox></LoadingBox>
                    ) : (
                      <>
                        {errorPay && (
                          <MessageBox variant="danger">{errorPay}</MessageBox>
                        )}
                        {loadingPay && <LoadingBox></LoadingBox>}

                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        ></PayPalButton>
                      </>
                    )}
                  </li>
                )}
                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <li>
                    {loadingDeliver && <LoadingBox></LoadingBox>}
                    {errorDeliver && (
                      <MessageBox variant="danger">{errorDeliver}</MessageBox>
                    )}
                    <button
                      type="button"
                      className="primary block"
                      onClick={deliverHandler}
                    >
                      Deliver Order
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
