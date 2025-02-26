import React from "react";
import StoreLayout from "../Layouts/StoreLayout";

const AboutUs = () => {
    return (
        <StoreLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Sobre Nosotros
                </h1>
                <div className="text-gray-700 leading-relaxed space-y-6">
                    <p>
                        Bienvenido a <strong>Nueve Colas</strong>, tu tienda
                        online especializada en cultura friki y otaku. Nacimos
                        con una idea: llevar los productos que tanto nos gustan
                        a todos los rincones del país, ya sean figuras de
                        colección, cómics, mangas o juegos de mesa para nuestros
                        clientes que comparten esta misma pasión.
                    </p>
                    <p>
                        Nuestra misión es convertirnos en la primera opción para
                        los amantes de lo friki, ofreciendo una experiencia de
                        compra fácil, rápida y segura. Creemos en la importancia
                        de fomentar una comunidad que valore el entretenimiento,
                        la creatividad y la imaginación, incluso en aquellos
                        lugares de España en donde todavía hoy no hay fácil
                        acceso.
                    </p>
                    <p>
                        En Nueve Colas, nos inspiramos en la mística y sabiduría
                        de los kitsune, los legendarios zorros de nueve colas de
                        la mitología japonesa. Los kitsune son conocidos por su
                        astucia, versatilidad y su capacidad para transformarse
                        y adaptarse a cualquier situación. Estos valores son el
                        corazón de nuestra tienda friki: un espacio que
                        evoluciona contigo, celebrando la imaginación, la
                        creatividad y la pasión por los mundos que nos inspiran.
                    </p>
                    <p>
                        Así como los kitsune guardan secretos y conectan con lo
                        mágico, en Nueve Colas encontrarás ese artículo
                        especial, ese detalle único que te transporta a tus
                        universos favoritos. Desde anime hasta videojuegos,
                        pasando por cómics y coleccionables, somos una tienda
                        hecha para los soñadores, los otakus y los gamers, un
                        santuario para todas las personas amantes de la cultura
                        geek.
                    </p>
                    <h2 className="text-2xl font-bold mt-6">¿Qué ofrecemos?</h2>
                    <ul className="list-disc ml-6 space-y-2">
                        <li>
                            Figuras de colección exclusivas y de alta calidad.
                        </li>
                        <li>
                            Amplia selección de cómics y mangas de todas las
                            temáticas.
                        </li>
                        <li>
                            Juegos de mesa para disfrutar en familia o con
                            amigos.
                        </li>
                        <li>Artículos especiales y ediciones limitadas.</li>
                    </ul>
                    <p>
                        Nos esforzamos por hacer que cada cliente se sienta
                        valorado y satisfecho. Si tienes alguna sugerencia o
                        necesitas ayuda, no dudes en{" "}
                        <a href="/contact" className="text-blue-500 underline">
                            contactarnos
                        </a>
                        .
                    </p>
                    <p>
                        <strong>
                            Gracias por elegir Nueve Colas. ¡Nos encanta ser
                            parte de tus historias y colecciones!
                        </strong>
                    </p>
                </div>
            </div>
        </StoreLayout>
    );
};

export default AboutUs;
