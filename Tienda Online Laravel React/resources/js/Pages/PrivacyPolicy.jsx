import React from "react";
import StoreLayout from "../Layouts/StoreLayout";

const PrivacyPolicy = () => {
    return (
        <StoreLayout>
            <div className="text-gray-700">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Política de Privacidad
                </h1>
                <p>
                    En <strong>Nueve Colas</strong>, valoramos tu privacidad.
                    Aquí detallamos cómo recopilamos, utilizamos y protegemos tu
                    información personal.
                </p>
                <h2 className="text-2xl font-bold mt-6">
                    Información que Recopilamos
                </h2>
                <ul className="list-disc ml-6 space-y-2">
                    <li>
                        Datos personales proporcionados al registrarte en
                        nuestro sitio.
                    </li>
                    <li>
                        Información de pago utilizada exclusivamente para
                        completar transacciones.
                    </li>
                    <li>Cookies para mejorar tu experiencia de navegación.</li>
                </ul>
                <p className="mt-4">
                    Para más información, no dudes en contactarnos a través de
                    nuestro formulario de{" "}
                    <a href="/contact" className="text-blue-500 underline">
                        Contacto
                    </a>
                    .
                </p>
            </div>
        </StoreLayout>
    );
};

export default PrivacyPolicy;
