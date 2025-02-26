import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { usePage } from "@inertiajs/react";
import StoreLayout from "../../layouts/StoreLayout";

const ProductDetail = ({ product }) => {
    const { flash } = usePage().props;

    const handleAddToCart = () => {
        Inertia.post(route("cart.store"), {
            product_id: product.id,
            product_name: product.name,
            product_price: product.price,
            product_image_url: product.image_url,
        });
    };

    return (
        <StoreLayout>
            <Container className="mt-5">
                <Row>
                    <Col md={6}>
                        <img
                            src={
                                product.image ??
                                "https://via.placeholder.com/1000"
                            }
                            alt={product.name}
                            className="img-fluid product-image"
                        />
                    </Col>
                    <Col md={6}>
                        {/* Mostrar mensaje de éxito si existe */}
                        {flash.success && (
                            <Alert variant="success" className="text-center">
                                {flash.success}
                            </Alert>
                        )}

                        <h1>{product.name}</h1>
                        <p>
                            Categoría:{" "}
                            {product.category?.name || "Sin categoría"}
                        </p>
                        <p>{product.description}</p>
                        <p>
                            {product.price != null
                                ? `${product.price} €`
                                : "Precio no disponible"}
                        </p>
                        <Button
                            variant="primary"
                            className="w-100"
                            onClick={handleAddToCart}
                        >
                            Agregar al carrito
                        </Button>
                    </Col>
                </Row>
            </Container>
        </StoreLayout>
    );
};

export default ProductDetail;
