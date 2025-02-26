import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Edit({ product, categories }) {
    const [values, setValues] = useState({
        name: product.name,
        description: product.description || "",
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
        image: product.image || "",
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(`/admin/products/${product.id}`, values);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto p-6 bg-white shadow-md rounded"
        >
            <div className="mb-4">
                <label className="block text-gray-700">Product Name</label>
                <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Stock</label>
                <input
                    type="number"
                    name="stock"
                    value={values.stock}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <select
                    name="category_id"
                    value={values.category_id}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    required
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Image URL</label>
                <input
                    type="text"
                    name="image"
                    value={values.image}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded mt-4"
            >
                Update Product
            </button>
        </form>
    );
}
