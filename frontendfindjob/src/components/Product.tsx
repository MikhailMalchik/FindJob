import React, { useState } from "react"
import { products } from "../data/products"
import { IProduct } from "../models"


interface ProductProps {
    product: IProduct
}

export function Product({product}: ProductProps){

    const [details,setDetails] = useState(false)

    const buttonDetailsColor = details ? 'bg-yellow-400' : 'bg-blue-400'

    const buttonStyles = ['py-2 px-4 border', buttonDetailsColor]

    return (
        <div
        className="border py-2 px-4 rounded flex flex-col items-center mb-2 ">
            <img src={product.image} className= "w-1/6" alt={product.title}/>
            <p>{product.title}</p>
            <p className="font-bold">{product.price}</p>
            <button className={buttonStyles.join(' ')}
            onClick={() => setDetails(prev =>!prev)}
            >
               {details ? 'Hide details' : 'Show details'}</button>
                {details && 
                <div>
                    <p>{product.description}</p>

                </div>}
        </div>
    )
}