import { useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router";

const PagoExitoso = ({ setCarrito }) => {
  useEffect(() => {
    // Limpiar el carrito cuando el pago es exitoso
    if (setCarrito) {
      setCarrito([]);
    }
  }, [setCarrito]);

  return (
    <Container className="mainSection d-flex justify-content-center align-items-center">
      <Card className="text-center shadow p-4">
        <Card.Body>
          <i className="bi bi-check-circle-fill text-success display-1 mb-3"></i>
          <Card.Title as="h1">¡Pago Exitoso!</Card.Title>
          <Card.Text>
            Gracias por tu compra. Hemos recibido tu pago correctamente.
            <br />
            En breve recibirás un correo electrónico con los detalles de tu pedido.
          </Card.Text>
          <Button as={Link} to="/" variant="primary">
            Volver al Inicio
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PagoExitoso;