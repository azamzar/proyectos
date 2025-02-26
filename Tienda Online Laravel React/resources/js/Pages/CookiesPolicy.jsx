import React from "react";
import StoreLayout from "../Layouts/StoreLayout";

const CookiesPolicy = () => {
    return (
        <StoreLayout>
            <div className="text-gray-700">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Política de Cookies
                </h1>
                <p>
                    En <strong>Nueve Colas</strong>, utilizamos cookies para
                    mejorar tu experiencia en nuestro sitio. A continuación, te
                    explicamos cómo funcionan y cómo puedes administrarlas.
                </p>
                <h2 className="text-2xl font-bold mt-6">
                    ¿Qué son las Cookies?
                </h2>
                <p>
                    Las cookies son pequeños archivos de texto que se almacenan
                    en tu dispositivo para recopilar información sobre tu
                    navegación.
                </p>
                <h2 className="text-2xl font-bold mt-6">Uso de las Cookies</h2>
                <ul className="list-disc ml-6 space-y-2">
                    <li>Personalizar tu experiencia en nuestra tienda.</li>
                    <li>Guardar tus preferencias y artículos en el carrito.</li>
                    <li>Analizar el tráfico en nuestro sitio web.</li>
                </ul>
                <p className="mt-4">
                    Puedes gestionar las cookies desde la configuración de tu
                    navegador o contactarnos para obtener más información.
                </p>
            </div>
        </StoreLayout>
    );
};

export default CookiesPolicy;
