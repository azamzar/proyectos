import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";
import StoreLayout from "../../layouts/StoreLayout";

const StoreIndex = () => {
    const { products, categories, flash = {} } = usePage().props;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

    // Filtrar productos según el nombre
    const filteredProducts = products?.data?.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddToCart = (product) => {
        if (isSubmitting) return; // Evitar múltiples clics
        setIsSubmitting(true);

        try {
            Inertia.post(route("cart.store"), {
                product_id: product.id,
                product_name: product.name,
                product_price: product.price,
                product_image_url: product.image_url,
            });
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <StoreLayout>
            <Container className="mt-5">
                {/* Mostrar el mensaje de éxito */}
                {flash.success && (
                    <div
                        className="alert alert-success text-center"
                        role="alert"
                    >
                        {flash.success}
                    </div>
                )}

                {/* Banner Principal tipo Slider */}
                <Row>
                    <Col>
                        <Carousel>
                            <Carousel.Item>
                                <Link href={route("category.show", "figuras")}>
                                    <img
                                        className="d-block w-100"
                                        src="/images/slide1.png"
                                    />
                                </Link>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Link
                                    href={route(
                                        "category.show",
                                        "comics-y-manga"
                                    )}
                                >
                                    <img
                                        className="d-block w-100"
                                        src="/images/slide3.png"
                                    />
                                </Link>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Link
                                    href={route(
                                        "category.show",
                                        "juegos-de-mesa"
                                    )}
                                >
                                    <img
                                        className="d-block w-100"
                                        src="/images/slide2.png"
                                    />
                                </Link>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>

                {/* Diseño principal con Categorías a la izquierda y Productos */}
                <Row className="mt-4">
                    {/* Columna de Categorías a la izquierda */}
                    <Col md={3} className="products-container">
                        <h4>Categorías</h4>
                        <ul className="list-group mt-4">
                            {categories &&
                                categories.map((category) => (
                                    <li
                                        key={category.id}
                                        className="list-group-item"
                                    >
                                        <Link
                                            href={route(
                                                "category.show",
                                                category.slug
                                            )}
                                            className="text-decoration-none"
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                        {/* Buscador de productos */}
                        <div className="mb-3 mt-8">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar productos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </Col>

                    {/* Lista de Productos */}
                    <Col md={9} className="products-container">
                        <h4 className="text-center mb-4">
                            Productos Destacados
                        </h4>
                        <Row>
                            {filteredProducts &&
                                filteredProducts.map((product) => (
                                    <Col
                                        key={product.id}
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                        className="mb-4"
                                    >
                                        <Card>
                                            <Link
                                                href={`/products/${product.id}`}
                                            >
                                                <Card.Img
                                                    variant="top"
                                                    src={
                                                        product.image ||
                                                        "https://via.placeholder.com/150"
                                                    }
                                                />
                                            </Link>
                                            <Card.Body>
                                                <Card.Title>
                                                    <Link
                                                        href={`/products/${product.id}`}
                                                    >
                                                        {product.name}
                                                    </Link>
                                                </Card.Title>
                                                <Card.Text>
                                                    {product.price != null
                                                        ? `${product.price} €`
                                                        : "Precio no disponible"}
                                                </Card.Text>
                                                <Button
                                                    variant="primary"
                                                    className="w-100"
                                                    onClick={() =>
                                                        handleAddToCart(product)
                                                    }
                                                    disabled={isSubmitting}
                                                >
                                                    Agregar al carrito
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </StoreLayout>
    );
};

export default StoreIndex;
