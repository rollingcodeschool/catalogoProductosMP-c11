import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router";

const CardProducto = ({producto, agregarAlCarrito}) => {
  return (
    <Col md={4} lg={3} className="mb-3">
      <Card className="h-100">
        <div>
          <img
            src={producto.imagen}
            alt={producto.nombreProducto}
            className="card-img-top-nueva"
          />
        </div>
        <Card.Body>
          <Card.Title className="primary-font">{producto.nombreProducto}</Card.Title>
          <Card.Text>
            Descripción: {producto.descripcion_breve}
            fuerte. <br className="mb-2" />
            <span className="fw-bold">Precio: ${producto.precio}</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-end">
           <Button variant="success" className="me-2" onClick={() => agregarAlCarrito(producto)}>
            <i className="bi bi-cart-plus-fill"></i> Agregar
          </Button>
          <Link variant="success" className="me-2 btn btn-success" to={'/detalle/'+producto._id}>
            Ver más
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardProducto;
