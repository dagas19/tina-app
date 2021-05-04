import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useParams } from "react-router-dom";
import { signout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { useEffect, useState } from "react";
import { listProductCategories } from "../actions/productActions";

export default function Header(props) {
  const [count] = useState(0);
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
    pageNumber = 1,
  } = useParams();
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const { cartItems } = cart;
  const userSingin = useSelector((state) => state.userSignin);
  const { userInfo } = userSingin;
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  const signoutHandler = () => {
    dispatch(signout());
  };
  useEffect(() => {
    dispatch(
      listProductCategories({
        category: category !== "all" ? category : "",
      }),
    );
  }, [category, dispatch, max, min, name, order, rating, pageNumber]);
  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };
  return (
    <div className="bord-under-nav">
      <nav className="navbar navbar-expand-lg  justify-content-between">
        <div className="brand">
          <Link className="navbar-brand" to="/">
            <img
              src="/images/logo.jpg"
              alt=""
              width="80"
              height="80"
              className="d-inline-block align-center"
            />
            Fab & Grand Treasures
          </Link>
        </div>
        <div className="mob w-100">
          <div className=" d-flex justify-content-between w-100">
            <div className="">
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className="btn btn-dark "
                >
                  <i className="fa fa-bars"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-2">
                    <Link to={"/search/category/all"}>All</Link>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    <Link to={"/search/category/Watches"}>Watches</Link>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-4">
                    <Link to={"/search/category/Shoes"}>Shoes</Link>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-5">
                    <Link to={"/search/category/Bags%20and%20Wallets"}>
                      Bags and Wallets
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="for-mobile">
              <Route
                render={({ history }) => (
                  <div className="ml-2">
                    <SearchBox history={history}></SearchBox>
                  </div>
                )}
              ></Route>
            </div>
            <div>
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className="btn btn-dark "
                ></Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    {" "}
                    <Link to="/profile">User Profile</Link>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    <Link to="/cart">
                      Cart
                      {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span>
                      )}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    <Link to="/orderhistory">Order History</Link>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign out
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        {loadingCategories ? (
          <LoadingBox></LoadingBox>
        ) : errorCategories ? (
          <MessageBox variant="danger">{errorCategories}</MessageBox>
        ) : (
          <ul className="navbar-nav m-auto p-2 justify-content-between  mw-100">
            <li></li>
            <li>
              <ul className="navbar-nav mr-auto justify-content-center ">
                <li className="nav-item">
                  <div className="d-flex content-center">
                    <Nav justify variant="tabs" defaultActiveKey="/home">
                      <Nav.Item>
                        <Nav.Link href="/home">
                          <Link to={getFilterUrl({ category: "all" })}>
                            All
                          </Link>
                        </Nav.Link>
                      </Nav.Item>
                      {categories.map((c, index) => (
                        <Nav.Item key={c}>
                          <Nav.Link eventKey={`link-${count + index}`}>
                            <Link to={getFilterUrl({ category: c })}>{c}</Link>
                          </Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>
                  </div>
                </li>

                <li className="s-box">
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
        )}
        <div className="pers">
          <Link to="/cart">
            <i className="fa fa-shopping-bag"></i>
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
