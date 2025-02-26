import React from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import StoreLayout from "../../layouts/StoreLayout";

const Category = ({ products, category }) => {
    const { flash } = usePage().props;

    const handleAddToCart = (product) => {
        Inertia.post(route("cart.store"), {
            product_id: product.id,
            product_name: product.name,
            product_price: product.price,
            product_image_url: product.image_url,
        });
    };

    return (
        <StoreLayout>
            {/* Banner horizontal */}
            <div
                style={{
                    backgroundImage: `url('/images/encabezado.png')`, // Ruta de la imagen del banner
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "250px", // Altura del banner
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <h1
                    style={{
                        color: "#fff",
                        fontSize: "3.5rem",
                        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
                    }}
                >
                    {category}
                </h1>
            </div>

            <Container className="mt-5 products-container">
                {/* Mostrar mensaje de éxito */}
                {flash.success && (
                    <Alert variant="success" className="text-center">
                        {flash.success}
                    </Alert>
                )}

                <Row>
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <Col
                                key={product.id}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                className="mb-4"
                            >
                                <Card>
                                    <Link href={`/products/${product.id}`}>
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
                                        >
                                            Agregar al carrito
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p className="text-center">
                            No se encontraron productos.
                        </p>
                    )}
                </Row>
            </Container>
        </StoreLayout>
    );
};

export default Category;
