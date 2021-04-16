import React, { useEffect, useState } from "react";
import LoadingBox from "../LoadingBox.js";
import MessageBox from "../MessageBox.js";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, newProduct } from "../../actions/productActions.js";

export default function ProductListScreen(props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const createProduct = useSelector((state) => state.createProduct);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      newProduct(
        name,
        image,
        category,
        price,
        description,
        countInStock,
        brand,
      ),
    );
  };

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="dam">{error}</MessageBox>
      ) : (
        <div className="row ">
          <div>
            <h1>Products</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>CATEGORY</th>
                  <th>PRICE</th>
                  <th>COUNT IN STOCK</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              {products.map((product) => (
                <tbody key={product._id} product={product}>
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.countInStock}</td>
                    <td>
                      <button type="button" className="small">
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
              ;
            </table>
          </div>
          <div>
            <form className="form" onSubmit={submitHandler}>
              <div>
                <h1>Add new product</h1>
              </div>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox var="danger">{error}</MessageBox>}
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="image">image</label>
                <input
                  type="text"
                  id="image"
                  placeholder="Enter image"
                  required
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  placeholder="Enter price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  placeholder="Enter category"
                  required
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  id="brand"
                  placeholder="Enter brand"
                  required
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  placeholder="Enter description"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="countInStock">Count In Stock</label>
                <input
                  type="number"
                  id="countInStock"
                  placeholder="Enter count in stock"
                  required
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </div>
              <div>
                <label />
                <button className="primary" type="submit">
                  Add product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
