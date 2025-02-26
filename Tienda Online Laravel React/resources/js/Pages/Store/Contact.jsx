// resources/js/Pages/Store/Contact.jsx
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import StoreLayout from "../../Layouts/StoreLayout";

const Contact = () => {
    return (
        <StoreLayout>
            <Container className="my-5">
                <h1 className="text-center mb-4">Contacto</h1>

                {/* Información de contacto */}
                <Row className="mb-5">
                    <Col md={6}>
                        <h4>Información de Contacto</h4>
                        <p>
                            <strong>Dirección:</strong> Calle Falsa 123, Ciudad
                            de Ejemplo
                        </p>
                        <p>
                            <strong>Teléfono:</strong> +34 123 456 789
                        </p>
                        <p>
                            <strong>Email:</strong> contacto@nuevecolas.com
                        </p>
                        <p>
                            <strong>Horario de contacto:</strong> Lunes a
                            Viernes, 9:00 - 18:00
                        </p>
                    </Col>
                </Row>

                {/* Formulario de contacto */}
                <Row>
                    <Col md={8}>
                        <h4>Envíanos un mensaje</h4>
                        <Form>
                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Tu nombre"
                                />
                            </Form.Group>

                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Tu correo electrónico"
                                />
                            </Form.Group>

                            <Form.Group controlId="subject" className="mb-3">
                                <Form.Label>Asunto</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Asunto del mensaje"
                                />
                            </Form.Group>

                            <Form.Group controlId="message" className="mb-3">
                                <Form.Label>Mensaje</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Escribe tu mensaje aquí"
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Enviar
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </StoreLayout>
    );
};

export default Contact;
