import React from "react";
import StoreLayout from "../Layouts/StoreLayout";

const Terms = () => {
    return (
        <StoreLayout>
            <div className="text-gray-700">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Condiciones de Uso
                </h1>
                <p>
                    Bienvenido a <strong>Nueve Colas</strong>. Al utilizar
                    nuestro sitio web y servicios, aceptas cumplir con los
                    siguientes términos y condiciones.
                </p>
                <h2 className="text-2xl font-bold mt-6">Términos Generales</h2>
                <ul className="list-disc ml-6 space-y-2">
                    <li>
                        El uso de nuestro sitio implica la aceptación de
                        nuestras políticas de privacidad y cookies.
                    </li>
                    <li>
                        Todos los productos están sujetos a disponibilidad en
                        inventario.
                    </li>
                    <li>
                        Nos reservamos el derecho de actualizar o modificar
                        estos términos en cualquier momento.
                    </li>
                </ul>
                <p className="mt-4">
                    Si tienes alguna duda sobre estas condiciones, contáctanos a
                    través de nuestro formulario de{" "}
                    <a href="/contact" className="text-blue-500 underline">
                        Contacto
                    </a>
                    .
                </p>
            </div>
        </StoreLayout>
    );
};

export default Terms;
