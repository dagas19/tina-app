import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;
  return (
    <div className="col-lg-3 col-md-6 mb-4 mb-lg-0 ">
      <div key={product._id} className="card rounded shadow-md">
        <div className="card-body p-4">
          <Link to={`/product/${product._id}`}>
            <img
              className="img-fluid d-block mx-auto mb-3"
              src={product.image}
              alt={product.name}
            ></img>
          </Link>
          <Link to={`/product/${product._id}`}>
            <h2 className="text-dark">{product.name}</h2>
          </Link>

          <ul className="small">
            <li className=" m-0">
              {" "}
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </li>
            <li className=" m-0">${product.price}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
