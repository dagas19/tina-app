import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { signout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import Nav from "react-bootstrap/Nav";

export default function Header(props) {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const { cartItems } = cart;
  const userSingin = useSelector((state) => state.userSignin);
  const { userInfo } = userSingin;

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <div className="bord-under-nav">
      <nav class="navbar navbar-expand-lg  justify-content-between">
        <div className="brand">
          <Link className="navbar-brand" to="/">
            <img
              src="/images/logo.jpg"
              alt=""
              width="80"
              height="80"
              class="d-inline-block align-center"
            />
            Fab & Grand Treasures
          </Link>
        </div>
        <ul class="navbar-nav m-auto p-2 justify-content-between  mw-100">
          <li>
            <ul class="navbar-nav mr-auto justify-content-center ">
              <li class="nav-item">
                <div className="d-flex content-center">
                  <Nav justify variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                      <Nav.Link href="/home">
                        <Link to={"/search/category/all"}>All</Link>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link eventKey="link-2">
                        <Link to={"/search/category/Watches"}>Watches</Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="link-3">
                        <Link to={"/search/category/Shoes"}>Shoes</Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="link-4">
                        <Link to={"/search/category/Bags%20and%20Wallets"}>
                          Bags and Wallets
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
              </li>

              <li>
                <Route
                  render={({ history }) => (
                    <div className="ml-2">
                      <SearchBox history={history}></SearchBox>
                    </div>
                  )}
                ></Route>
              </li>
            </ul>
          </li>
        </ul>
        <div>
          <Link to="/cart">
            <i class="fa fa-shopping-bag"></i>
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
          {userInfo ? (
            <div className="dropdown">
              <Link to="#">
                {userInfo.name} <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/profile">User Profile</Link>
                </li>
                <li>
                  <Link to="/orderhistory">Order History</Link>
                </li>
                <li>
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">Sign in</Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <Link to="#admin">
                Admin <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content bg-light">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/productlist">Products</Link>
                </li>
                <li>
                  <Link to="/orderlist">Orders</Link>
                </li>
                <li>
                  <Link to="/userlist">Users</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
