import React from "react";
import { usePage } from "@inertiajs/react";
import StoreLayout from "../../Layouts/StoreLayout";
import { Container, Table } from "react-bootstrap";

const Orders = () => {
    const { orders } = usePage().props;

    return (
        <StoreLayout>
            <Container className="my-5">
                <h2>Mis Pedidos</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fecha</th>
                            <th>Dirección</th>
                            <th>Método de Pago</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.id}</td>
                                <td>
                                    {new Date(
                                        order.created_at
                                    ).toLocaleString()}
                                </td>
                                <td>{order.address}</td>
                                <td>{order.payment_method}</td>{" "}
                                {/* Nueva columna */}
                                <td>{parseFloat(order.total).toFixed(2)} €</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </StoreLayout>
    );
};

export default Orders;
