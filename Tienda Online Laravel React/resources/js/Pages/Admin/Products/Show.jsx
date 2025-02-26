import React from "react";

export default function Show({ product }) {
    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>Category: {product.category?.name || "No Category"}</p>
        </div>
    );
}
