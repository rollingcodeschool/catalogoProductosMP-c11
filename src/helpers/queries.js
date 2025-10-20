const urlproductos = import.meta.env.VITE_API_PRODUCTOS;
const urlUsuarios = import.meta.env.VITE_API_USUARIOS;
// get, post, put, delete

export const leerProductos = async () => {
  try {
    const respuesta = await fetch(urlproductos);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const obtenerProductoPorID = async (id) => {
  try {
    const respuesta = await fetch(urlproductos + `/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const crearProducto = async (productoNuevo) => {
  try {
    const formData = new FormData();
    formData.append('nombreProducto', productoNuevo.nombreProducto)
    formData.append("precio", productoNuevo.precio);
    formData.append("categoria", productoNuevo.categoria);
    formData.append("descripcion_breve", productoNuevo.descripcion_breve);
    formData.append("descripcion_amplia", productoNuevo.descripcion_amplia);
    formData.append("imagen", productoNuevo.imagen); // imagen es un File

    const respuesta = await fetch(urlproductos, {
      method: "POST",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("userKey")).token,
      },
      body: formData,
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const editarProducto = async (productoEditado, id) => {
  try {
    const respuesta = await fetch(urlproductos + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem("userKey")).token,
      },
      body: JSON.stringify(productoEditado),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const borrarProductoPorID = async (id) => {
  try {
    const respuesta = await fetch(urlproductos + `/${id}`, {
      method: "DELETE",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("userKey")).token,
      },
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const login = async (datosUsuario) => {
  try {
    const respuesta = await fetch(urlUsuarios + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosUsuario),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const leerProductosPaginados = async (page, limit) => {
  try {
    // const respuesta = await fetch(`${urlproductos}/paginacion?page=${page}&limit=${limit}`);
    const respuesta = await fetch(`${urlproductos}/paginados?page=${page}&limit=${limit}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};