import React from "react";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { FaShoppingCart } from "react-icons/fa"; // Importa el icono

export default function Navbar() {
    const { auth } = usePage().props;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container">
                <Link className="navbar-brand" href={route("store.index")}>
                    <img
                        src="/images/logo-nueve-colas-menu.png"
                        alt="Logo Tienda Friki"
                        style={{ height: "110px" }}
                    />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                href={route("category.show", "figuras")}
                            >
                                Figuras
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                href={route("category.show", "comics-y-manga")}
                            >
                                Cómics y Manga
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                href={route("category.show", "juegos-de-mesa")}
                            >
                                Juegos de Mesa
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                href={route("store.contact")}
                            >
                                Contacto
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {auth.user ? (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        href={route("user.profile")}
                                    >
                                        Mi Cuenta
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link text-danger log"
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        onSuccess={() => {
                                            Inertia.visit(
                                                route("store.index"),
                                                { preserveState: false }
                                            );
                                        }}
                                    >
                                        Cerrar Sesión
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item log">
                                <Link
                                    className="nav-link text-primary"
                                    href={route("login")}
                                >
                                    Iniciar Sesión
                                </Link>
                            </li>
                        )}

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                href={route("cart.index")}
                            >
                                <FaShoppingCart size={20} />{" "}
                                {/* Ícono del carrito */}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
