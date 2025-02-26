import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage, Link } from "@inertiajs/react";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Alert,
} from "react-bootstrap";
import StoreLayout from "../../Layouts/StoreLayout";

export default function Profile() {
    const { user, errors } = usePage().props;

    // Manejo de los estados del formulario
    const [name, setName] = useState(user.name || "");
    const [email, setEmail] = useState(user.email || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [address, setAddress] = useState(user.address || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put("/user/profile", {
            name,
            email,
            phone,
            address,
            current_password: currentPassword,
            new_password: newPassword,
            new_password_confirmation: confirmPassword,
        });
    };

    return (
        <StoreLayout>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={8}>
                        {/* Botón para ir a Mis Pedidos */}
                        <Link
                            href={route("orders.index")}
                            className="btn btn-secondary mb-4 w-100"
                        >
                            Ver Mis Pedidos
                        </Link>
                        <Card>
                            <Card.Header>
                                <h3 className="mb-0">Perfil de Usuario</h3>
                            </Card.Header>
                            <Card.Body>
                                {/* Mostrar errores de validación solo si existen */}
                                {errors && Object.keys(errors).length > 0 && (
                                    <Alert variant="danger">
                                        <ul className="mb-0">
                                            {Object.keys(errors).map((key) => (
                                                <li key={key}>{errors[key]}</li>
                                            ))}
                                        </ul>
                                    </Alert>
                                )}

                                {/* Formulario de actualización de perfil */}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Teléfono</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={phone}
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Dirección</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                        />
                                    </Form.Group>

                                    <hr />
                                    <h5>Cambiar Contraseña</h5>

                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Contraseña Actual
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) =>
                                                setCurrentPassword(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Nueva Contraseña
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Confirmar Nueva Contraseña
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100"
                                    >
                                        Guardar Cambios
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </StoreLayout>
    );
}
