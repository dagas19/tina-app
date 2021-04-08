import React from 'react'
import Product from '../Product.js'
import data from '../../data';


export default function HomeScreen() {
    return (
        <div>
            <div className="row center">
                {data.products.map((product) => (
                <Product key={product._id} product={product} />
                ))};
                
            </div>
        </div>
    )
}
