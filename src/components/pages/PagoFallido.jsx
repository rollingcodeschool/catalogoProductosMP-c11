import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router";

const PagoFallido = () => {
  return (
    <Container className="mainSection d-flex justify-content-center align-items-center">
      <Card className="text-center shadow p-4">
        <Card.Body>
          <i className="bi bi-x-circle-fill text-danger display-1 mb-3"></i>
          <Card.Title as="h1">¡El pago ha fallado!</Card.Title>
          <Card.Text>
            Lamentablemente, no pudimos procesar tu pago.
            <br />
            Por favor, intenta nuevamente o utiliza otro método de pago.
          </Card.Text>
          <Button as={Link} to="/carrito" variant="danger">
            Volver al Carrito
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PagoFallido;