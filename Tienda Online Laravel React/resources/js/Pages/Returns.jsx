import React from "react";
import StoreLayout from "../Layouts/StoreLayout";

const Returns = () => {
    return (
        <StoreLayout>
            <div className="text-gray-700">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Devoluciones
                </h1>
                <p>
                    En <strong>Nueve Colas</strong>, nuestra prioridad es
                    garantizar tu satisfacción con cada compra. Si necesitas
                    devolver un producto, ofrecemos una política de devoluciones
                    flexible y transparente.
                </p>
                <h2 className="text-2xl font-bold mt-6">
                    Política de Devoluciones
                </h2>
                <ul className="list-disc ml-6 space-y-2">
                    <li>
                        Tienes hasta 30 días después de recibir el producto para
                        realizar la devolución.
                    </li>
                    <li>
                        El producto debe estar en su empaque original y en
                        condiciones nuevas.
                    </li>
                    <li>
                        Los costos de envío para la devolución correrán por
                        cuenta del cliente, salvo en casos de defectos de
                        fábrica.
                    </li>
                </ul>
                <p className="mt-4">
                    Para iniciar el proceso de devolución, ponte en contacto con
                    nosotros a través de nuestro formulario de{" "}
                    <a href="/contact" className="text-blue-500 underline">
                        Contacto
                    </a>
                    .
                </p>
            </div>
        </StoreLayout>
    );
};

export default Returns;
