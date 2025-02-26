import React from "react";

export default function OrderIndex({ orders }) {
    return (
        <div className="max-w-4xl mx-auto py-6">
            <h1 className="text-3xl font-bold mb-6">Resumen de tus pedidos</h1>

            {orders.length > 0 ? (
                <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b">Pedido #</th>
                            <th className="py-2 px-4 border-b">Total</th>
                            <th className="py-2 px-4 border-b">Estado</th>
                            <th className="py-2 px-4 border-b">Fecha</th>
                            <th className="py-2 px-4 border-b">Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-t">
                                <td className="py-2 px-4 border-b">
                                    #{order.id}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {order.total.toFixed(2)} €
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {order.status}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {new Date(
                                        order.created_at
                                    ).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <details>
                                        <summary>Ver detalles</summary>
                                        <ul>
                                            {order.details.map((detail) => (
                                                <li key={detail.id}>
                                                    {detail.product.name} -
                                                    Cantidad: {detail.quantity},
                                                    Precio: {detail.price} €
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No tienes pedidos realizados.</p>
            )}
        </div>
    );
}
