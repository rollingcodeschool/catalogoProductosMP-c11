import { Navbar, Container, Nav, Button } from "react-bootstrap";
import logo from "../../assets/coffee_logo.png";
import { NavLink, Link, useNavigate } from "react-router";

const Menu = ({ usuarioAdmin, setUsuarioAdmin, carrito }) => {
  const navegacion = useNavigate();

  const logout = () => {
    setUsuarioAdmin({});
    navegacion("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          <img
            src={logo}
            alt="logo Rolling Coffee"
            className="img-fluid"
            width={150}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink className="nav-link" to={"/"}>
              Inicio
            </NavLink>
            {usuarioAdmin.token ? (
              <>
                <NavLink className="nav-link" to={"/administrador"}>
                  Administrador
                </NavLink>
                <NavLink className="nav-link" to={"/carrito"}>
                  Carrito
                </NavLink>
                <Button className="nav-link" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <NavLink className="nav-link" to={"/login"}>
                Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
