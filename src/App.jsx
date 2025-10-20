import { BrowserRouter, Routes, Route } from "react-router";
import Administrador from "./components/pages/Administrador";
import DetalleProducto from "./components/pages/DetalleProducto";
import Error404 from "./components/pages/Error404";
import Inicio from "./components/pages/Inicio";
import Login from "./components/pages/Login";
import FormularioProducto from "./components/pages/producto/FormularioProducto";
import Footer from "./components/shared/Footer";
import Menu from "./components/shared/Menu";
import { useEffect, useState } from "react";
import ProtectorAdmin from "./components/routes/ProtectorAdmin";
import Carrito from "./components/pages/Carrito";
import PagoExitoso from './components/pages/PagoExitoso'
import Swal from "sweetalert2";

function App() {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("userKey")) || {};
  const [usuarioAdmin, setUsuarioAdmin] = useState(usuarioLogueado);
  const carritoLocalStorage =
    JSON.parse(localStorage.getItem("carrito-cafe")) || [];
  const [carrito, setCarrito] = useState(carritoLocalStorage);

  useEffect(() => {
    localStorage.setItem("carrito-cafe", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    sessionStorage.setItem("userKey", JSON.stringify(usuarioAdmin));
  }, [usuarioAdmin]);

  const agregarAlCarrito = (productoAgregado) => {
  const itemExistente = carrito.find(
    (item) => item._id === productoAgregado._id
  );

  if (itemExistente) {
    setCarrito(
      carrito.map((item) =>
        item._id === productoAgregado._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  } else {
    setCarrito([...carrito, { ...productoAgregado, quantity: 1 }]);
  }

  Swal.fire({
    icon: "success",
    title: "Producto agregado al carrito",
    showConfirmButton: false,
    timer: 1500,
  });
}

  return (
    <>
      <BrowserRouter>
        <Menu
          usuarioAdmin={usuarioAdmin}
          setUsuarioAdmin={setUsuarioAdmin}
          carrito={carrito}
        ></Menu>
        <main>
          <Routes>
            <Route path="/" element={<Inicio agregarAlCarrito={agregarAlCarrito}/>}></Route>
            <Route
              path="/carrito"
              element={
                <Carrito carrito={carrito} setCarrito={setCarrito}></Carrito>
              }
            ></Route>
            <Route
              path="/detalle/:id"
              element={<DetalleProducto></DetalleProducto>}
            ></Route>
            <Route
              path="/pago/exitoso"
              element={<PagoExitoso setCarrito={setCarrito} />}
            />
            <Route
              path="/login"
              element={<Login setUsuarioAdmin={setUsuarioAdmin}></Login>}
            ></Route>
            <Route
              path="/administrador"
              element={<ProtectorAdmin isAdmin={usuarioAdmin}></ProtectorAdmin>}
            >
              <Route index element={<Administrador></Administrador>}></Route>
              <Route
                path="crear"
                element={
                  <FormularioProducto
                    titulo={"Crear producto"}
                  ></FormularioProducto>
                }
              ></Route>
              <Route
                path="editar/:id"
                element={
                  <FormularioProducto
                    titulo={"Editar producto"}
                  ></FormularioProducto>
                }
              ></Route>
            </Route>
            <Route path="*" element={<Error404></Error404>}></Route>
          </Routes>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
