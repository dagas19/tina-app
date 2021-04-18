import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import CartScreen from "./components/Screens/CartScreen";
import HomeScreen from "./components/Screens/HomeScreen";
import OrderHistoryScreen from "./components/Screens/OrderHistoryScreen";
import OrderScreen from "./components/Screens/OrderScreen";
import PaymentMethodScreen from "./components/Screens/PaymentMethodScreen";
import PlaceOrderScreen from "./components/Screens/PlaceOrderScreen";
import ProductListScreen from "./components/Screens/ProductListScreen";
import ProductScreen from "./components/Screens/ProductScreen";
import ProfileScreen from "./components/Screens/ProfileScreen";
import RegisterScreen from "./components/Screens/RegisterScreen";
import ShippingAddressScreen from "./components/Screens/ShippingAddressScreen";
import SinginScreen from "./components/Screens/SigninScreen";
import ProductEditScreen from "./components/Screens/ProductEditScreen";
import OrderListScreen from "./components/Screens/OrderListScreen";
import UserListScreen from "./components/Screens/UserListScreen";
import UserEditScreen from "./components/Screens/UserEditScreen";
import { useEffect, useState } from "react";
import SearchScreen from "./components/Screens/SearchScreen";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import { listProductCategories } from "./actions/productActions";
import SearchBox from "./components/SearchBox";
import DashboardScreen from "./components/Screens/DashboardScreen";
import Header from "./components/Header";

function App(props) {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const { cartItems } = cart;
  const userSingin = useSelector((state) => state.userSignin);
  const { userInfo } = userSingin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div>
        <header>
          <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
              <div>
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
                    <li class="nav-item active">
                      <Header></Header>
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
                  Cart
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
        </header>
        <aside className={sidebarIsOpen ? "open" : ""}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} excat></Route>
          <Route path="/signin" component={SinginScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
          ></AdminRoute>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/dashboard"
            component={DashboardScreen}
          ></AdminRoute>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
        </main>
        <footer class="page-footer text-white font-small blue bg-dark">
          <div class="footer-copyright text-center py-3">
            © 2020 Copyright:
            <p>© 2020 Copyright: Fab & Grand Treasures</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
