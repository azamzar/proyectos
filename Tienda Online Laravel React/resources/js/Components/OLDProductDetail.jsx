import React from "react";
import { Inertia } from "@inertiajs/inertia";

export default function ProductDetail({ product }) {
    const handleAddToCart = () => {
        Inertia.post("/cart", { product_id: product.id });
    };

    return (
        <div className="max-w-4xl mx-auto py-6">
            <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
            <img
                src={product.image || "placeholder.jpg"}
                alt={product.name}
                className="w-full h-64 object-cover rounded mb-4"
            />
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-2xl font-semibold mb-4">${product.price}</p>
            <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white py-2 px-4 rounded"
            >
                Agregar al carrito
            </button>
        </div>
    );
}
