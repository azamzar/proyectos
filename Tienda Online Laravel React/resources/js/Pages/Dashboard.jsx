import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { auth } = usePage().props;

    const roles = auth?.user?.roles || [];

    // Comprobar si el usuario es admin
    const isAdmin = roles.includes("admin");

    // Comprobar si el usuario es un usuario normal
    const isUser = roles.includes("user");

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            ¡Bienvenido/a!
                            {/* Mostrar roles para debugging */}
                            <p>
                                <strong>Roles del usuario:</strong>{" "}
                                {roles.join(", ")}
                            </p>
                            {/* Mostrar diferentes vistas según el rol */}
                            {isAdmin && (
                                <div>
                                    <h3 className="text-lg font-bold mt-6">
                                        Admin Panel
                                    </h3>
                                    <p>
                                        Aquí puedes gestionar los productos de
                                        la tienda.
                                    </p>
                                    <a
                                        href="/admin/products"
                                        className="text-blue-600"
                                    >
                                        Gestionar Productos
                                    </a>
                                </div>
                            )}
                            {isUser && (
                                <div>
                                    <h3 className="text-lg font-bold mt-6">
                                        User Dashboard
                                    </h3>
                                    <p>
                                        Aquí puedes ver tus pedidos y gestionar
                                        tu carrito de compras.
                                    </p>
                                    <a href="/cart" className="text-blue-600">
                                        Ver Carrito
                                    </a>
                                    <a
                                        href="/orders"
                                        className="text-blue-600 ml-4"
                                    >
                                        Ver Pedidos
                                    </a>
                                </div>
                            )}
                            {/* Botón para ir a la tienda */}
                            <div className="mt-6">
                                <a
                                    href="/store"
                                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    Ir a la Tienda
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
