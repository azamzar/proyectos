import React, { useState, useEffect } from "react";
import StoreLayout from "../../Layouts/StoreLayout";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";

export default function CartIndex({ cartItems: initialCartItems }) {
    // Estado local para manejar los elementos del carrito
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [totalPrice, setTotalPrice] = useState(0);

    // Recalcular el precio total cada vez que cambian los elementos del carrito
    useEffect(() => {
        const total = cartItems.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
        );
        setTotalPrice(total);
    }, [cartItems]);

    // Función para manejar la eliminación de un producto
    const handleRemoveItem = (productId) => {
        Inertia.post(
            route("cart.remove"),
            { product_id: productId },
            {
                onSuccess: () => {
                    setCartItems(
                        cartItems.filter((item) => item.id !== productId)
                    );
                },
            }
        );
    };

    // Función para manejar el cambio de cantidad
    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return; // Asegurarse de que la cantidad sea al menos 1

        // Actualizar la cantidad en el estado local
        setCartItems(
            cartItems.map((item) =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );

        // Enviar una solicitud para actualizar la cantidad en el servidor
        Inertia.post(route("cart.updateQuantity"), {
            product_id: productId,
            quantity: newQuantity,
        });
    };

    // Manejar el checkout para asegurarse de que el servidor tiene los datos más recientes
    const handleCheckout = () => {
        Inertia.get(route("checkout.index"), {
            cart: cartItems,
        });
    };

    return (
        <StoreLayout>
            <div className="max-w-4xl mx-auto py-6">
                <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>

                {cartItems.length > 0 ? (
                    <>
                        <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-2 px-4 border-b">
                                        Producto
                                    </th>
                                    <th className="py-2 px-4 border-b">
                                        Cantidad
                                    </th>
                                    <th className="py-2 px-4 border-b">
                                        Precio
                                    </th>
                                    <th className="py-2 px-4 border-b">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="py-2 px-4 border-b">
                                            {item.name}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                min="1"
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        parseInt(
                                                            e.target.value,
                                                            10
                                                        )
                                                    )
                                                }
                                                className="border rounded w-16 text-center"
                                            />
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            {(
                                                item.quantity * item.price
                                            ).toFixed(2)}{" "}
                                            €
                                        </td>
                                        <td className="py-2 px-4 border-b text-center">
                                            <button
                                                onClick={() =>
                                                    handleRemoveItem(item.id)
                                                }
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Mostrar el precio total */}
                        <div className="mt-6 text-right">
                            <p className="text-xl font-bold mb-4">
                                Total: {totalPrice.toFixed(2)} €
                            </p>
                            <button
                                onClick={handleCheckout}
                                className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700"
                            >
                                Ir al Checkout
                            </button>
                        </div>
                    </>
                ) : (
                    <p>No tienes productos en tu carrito.</p>
                )}
            </div>
        </StoreLayout>
    );
}
