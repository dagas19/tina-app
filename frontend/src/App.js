import { BrowserRouter, Route } from "react-router-dom";
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
import SearchScreen from "./components/Screens/SearchScreen";
import DashboardScreen from "./components/Screens/DashboardScreen";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Header />
        </header>
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
            path="/search/brand/:brand"
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
        <footer className="page-footer text-white font-small blue bg-dark">
          <div className="footer-copyright text-center py-3">
            © 2020 Copyright:
            <p>© 2020 Copyright: Fab & Grand Treasures</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
