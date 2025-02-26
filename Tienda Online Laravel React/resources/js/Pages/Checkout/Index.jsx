import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import { Container, Row, Col, ListGroup, Button, Form } from "react-bootstrap";
import { router } from "@inertiajs/react";
import StoreLayout from "../../Layouts/StoreLayout";

const provinces = [
    "Álava",
    "Albacete",
    "Alicante",
    "Almería",
    "Asturias",
    "Ávila",
    "Badajoz",
    "Barcelona",
    "Burgos",
    "Cáceres",
    "Cádiz",
    "Cantabria",
    "Castellón",
    "Ciudad Real",
    "Córdoba",
    "La Coruña",
    "Cuenca",
    "Gerona",
    "Granada",
    "Guadalajara",
    "Guipúzcoa",
    "Huelva",
    "Huesca",
    "Islas Baleares",
    "Jaén",
    "León",
    "Lérida",
    "Lugo",
    "Madrid",
    "Málaga",
    "Murcia",
    "Navarra",
    "Orense",
    "Palencia",
    "Las Palmas",
    "Pontevedra",
    "La Rioja",
    "Salamanca",
    "Segovia",
    "Sevilla",
    "Soria",
    "Tarragona",
    "Santa Cruz de Tenerife",
    "Teruel",
    "Toledo",
    "Valencia",
    "Valladolid",
    "Vizcaya",
    "Zamora",
    "Zaragoza",
];

const Checkout = () => {
    const { cart, total } = usePage().props;

    // Estados para controlar el formulario
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("tarjeta");
    const [province, setProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const handleCheckout = (e) => {
        e.preventDefault();

        // Datos del pedido
        const orderData = {
            name,
            address,
            phone,
            email,
            province,
            postalCode,
            paymentMethod,
            items: cart,
            total,
        };

        // Enviar el pedido al servidor
        router.post(route("orders.store"), orderData, {
            onSuccess: () => {
                router.post(
                    route("cart.clear"),
                    {},
                    {
                        onSuccess: () => {
                            router.visit(route("orders.index"));
                        },
                    }
                );
            },
        });
    };

    return (
        <StoreLayout>
            <Container className="my-5">
                <h2>Resumen del Pedido</h2>
                <ListGroup variant="flush" className="mb-4">
                    {cart.map((item, index) => (
                        <ListGroup.Item key={index}>
                            <Row>
                                <Col md={8}>{item.name}</Col>
                                <Col md={2}>
                                    {parseFloat(item.price).toFixed(2)} €
                                </Col>
                                <Col md={2}>Cantidad: {item.quantity}</Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item className="text-end">
                        <strong>Total: {parseFloat(total).toFixed(2)} €</strong>
                    </ListGroup.Item>
                </ListGroup>

                <h3>Detalles de Pago</h3>
                <Form onSubmit={handleCheckout}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Nombre Completo</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa tu nombre"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formPhone">
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="Ingresa tu teléfono"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Ingresa tu email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group
                                className="mb-3"
                                controlId="formAddress"
                            >
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa tu dirección"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group
                                className="mb-3"
                                controlId="formProvince"
                            >
                                <Form.Label>Provincia</Form.Label>
                                <Form.Select
                                    value={province}
                                    onChange={(e) =>
                                        setProvince(e.target.value)
                                    }
                                    required
                                >
                                    <option value="" disabled>
                                        Selecciona tu provincia
                                    </option>
                                    {provinces.map((province, index) => (
                                        <option key={index} value={province}>
                                            {province}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group
                                className="mb-3"
                                controlId="formPostalCode"
                            >
                                <Form.Label>Código Postal</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa tu código postal"
                                    value={postalCode}
                                    onChange={(e) =>
                                        setPostalCode(e.target.value)
                                    }
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group
                                className="mb-3"
                                controlId="formPaymentMethod"
                            >
                                <Form.Label>Método de Pago</Form.Label>
                                <Form.Select
                                    value={paymentMethod}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                    required
                                >
                                    <option value="tarjeta">
                                        Tarjeta de Crédito/Débito
                                    </option>
                                    <option value="paypal">PayPal</option>
                                    <option value="transferencia">
                                        Transferencia Bancaria
                                    </option>
                                    <option value="efectivo">Bizum</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="success" type="submit" className="w-100">
                        Confirmar Compra
                    </Button>
                </Form>
            </Container>
        </StoreLayout>
    );
};

export default Checkout;
