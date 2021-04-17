import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import "./App.css";
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

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSingin = useSelector((state) => state.userSignin);
  const { userInfo } = userSingin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Tina shop
            </Link>
          </div>
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
                <ul className="dropdown-content">
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
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} excat></Route>
          <Route path="/signin" component={SinginScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
          ></AdminRoute>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
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
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
