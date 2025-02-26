import React, { useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";

export default function Index({ products }) {
    const { url } = usePage();
    const params = new URLSearchParams(url.split("?")[1]);
    const success = params.get("success") ?? "";

    // UseEffect para eliminar los parámetros después de un tiempo
    useEffect(() => {
        if (success !== "") {
            const timer = setTimeout(() => {
                // Reemplazar la URL actual sin los parámetros
                Inertia.replace(url.split("?")[0]);
            }, 3000); // Eliminar después de 3 segundos

            // Limpiar el temporizador si el componente se desmonta
            return () => clearTimeout(timer);
        }
    }, [success, url]);

    return (
        <div className="max-w-4xl mx-auto py-6">
            {/* Botón para volver al dashboard */}
            <div className="mb-4">
                <a
                    href="/dashboard"
                    className="inline-block bg-gray-500 text-white py-2 px-4 rounded"
                >
                    Volver al Dashboard
                </a>
            </div>

            <h1 className="text-3xl font-bold mb-6">Lista de Productos</h1>

            {success !== "" ? (
                <div
                    id="messageSuccess"
                    className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                >
                    {success}
                </div>
            ) : (
                <div></div>
            )}

            <a
                href="/admin/products/create"
                className="mb-4 inline-block bg-blue-500 text-white py-2 px-4 rounded"
            >
                Añadir Nuevo Producto
            </a>

            <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 border-b">
                            Nombre del Producto
                        </th>
                        <th className="py-2 px-4 border-b">Precio</th>
                        <th className="py-2 px-4 border-b">Stock</th>
                        <th className="py-2 px-4 border-b">Categoría</th>
                        <th className="py-2 px-4 border-b">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-t">
                            <td className="py-2 px-4 border-b">
                                {product.name}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {product.price}€
                            </td>
                            <td className="py-2 px-4 border-b">
                                {product.stock}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {product.category?.name || "Sin categoría"}
                            </td>
                            <td className="py-2 px-4 border-b">
                                <a
                                    href={`/admin/products/${product.id}/edit`}
                                    className="text-blue-500 mr-2"
                                >
                                    Editar
                                </a>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="text-red-500"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const handleDelete = (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        Inertia.delete(`/admin/products/${id}`);
    }
};
