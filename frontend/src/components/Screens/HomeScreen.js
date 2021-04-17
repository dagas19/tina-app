import React, { useEffect } from "react";
import Product from "../Product.js";
import LoadingBox from "../LoadingBox.js";
import MessageBox from "../MessageBox.js";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions.js";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="dam">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
          ;
        </div>
      )}
    </div>
  );
}
