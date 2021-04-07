import React from 'react'
import Rating from './Rating';

export default function Product(props) {
    const{product} = props;
    return (
        <div key={product._id} className="card">
            <a href={`/product/${product._id}`}>
                <img className="medium" src={product.image} alt={product.name}></img>
            </a>
            <div className="card-body">
                <a href="product.html">
                    <a href={`/product/${product._id}`}></a>
                </a>
                <Rating rating={product.rating} />
                <div className={product.price}>
                    $120
                </div>
            </div>
        </div>
    )
}
