import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router";

const PagoPendiente = () => {
  return (
    <Container className="mainSection d-flex justify-content-center align-items-center">
      <Card className="text-center shadow p-4">
        <Card.Body>
          <i className="bi bi-hourglass-split text-warning display-1 mb-3"></i>
          <Card.Title as="h1">Pago Pendiente</Card.Title>
          <Card.Text>
            Tu pago está siendo procesado y se encuentra pendiente de confirmación.
            <br />
            Recibirás una notificación por correo electrónico una vez que se complete.
          </Card.Text>
          <Button as={Link} to="/" variant="primary">
            Volver al Inicio
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PagoPendiente;