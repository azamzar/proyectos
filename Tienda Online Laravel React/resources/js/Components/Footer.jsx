import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Sección 1 */}
                    <div>
                        <h5 className="font-bold text-lg mb-3">
                            Nuestra Tienda
                        </h5>
                        <ul>
                            <li>
                                <a
                                    href="/about-us"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Sobre Nosotros
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/register"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Registro
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Contacto
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Sección 2 */}
                    <div>
                        <h5 className="font-bold text-lg mb-3">Políticas</h5>
                        <ul>
                            <li>
                                <a
                                    href="/returns"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Devoluciones
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/terms"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Condiciones de Uso
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/privacy-policy"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Política de Privacidad
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Sección 3 */}
                    <div>
                        <h5 className="font-bold text-lg mb-3">Cookies</h5>
                        <ul>
                            <li>
                                <a
                                    href="/cookies-policy"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Política de Cookies
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-6 text-gray-500">
                    &copy; 2025 Nueve Colas. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
