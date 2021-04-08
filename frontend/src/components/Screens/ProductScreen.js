import React from 'react'
import { Link } from 'react-router-dom'
import data from '../../data'
import Product from '../Product'
import Rating from '../Rating'

export default function ProductScreen(props) {
    const product = data.products.find((x)=> x._id === props.match.params.id)
    if(!product){
        return <div>Product not found</div>
    }
    return (
        <div>
            <Link to="/">Back to result</Link>
           <div className="row top">
               <div className="col-2">
                    <img class="large" src={product.image} alt={product.image}/>
               </div>
               <div className="col-1">
                <ul>
                    <li>
                        <h1>{product.name}</h1>
                    </li>
                    <li>
                        <Rating rating={product.rating}></Rating>
                    </li>
                    <li>Price : ${product.price}</li>
                    <li>Description:
                        <p>{product.description}</p>
                    </li>
                </ul>
               </div>
               <div className="col-1">  
                    <div class="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Price</div>
                                    <div className="price">${product.price}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status: </div>
                                    <div>
                                        {product.countInStock>0? (
                                            <span className="success">In Stock</span>
                                        ) : (
                                            <span className="error">Unavialable</span>
                                        )}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button className="primary block">Add To Cart</button>
                            </li>
                        </ul>
                    </div>
               </div>
           </div>
        </div>
    )
}
