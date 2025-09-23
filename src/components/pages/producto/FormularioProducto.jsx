import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import {
  crearProducto,
  obtenerProductoPorID,
  editarProducto,
} from "../../../helpers/queries";
import './FormularioProducto.css'

const FormularioProducto = ({ titulo }) => {
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
    setValue,
  } = useForm();
  const { id } = useParams();
  const navegacion = useNavigate();
  const [imagenActual, setImagenActual] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    //verificar si estoy editando
    obtenerProducto();
  }, []);

  const obtenerProducto = async () => {
    if (titulo === "Editar producto") {
      //busco el producto por id y lo dibujo en el formulario
      const respuesta = await obtenerProductoPorID(id);
      if (respuesta.status === 200) {
        const productoBuscado = await respuesta.json();
        setValue("nombreProducto", productoBuscado.nombreProducto);
        setValue("precio", productoBuscado.precio);
        setValue("descripcion_breve", productoBuscado.descripcion_breve);
        setValue("descripcion_amplia", productoBuscado.descripcion_amplia);
        setValue("categoria", productoBuscado.categoria);
        setImagenActual(productoBuscado.imagen);
      }
    }
  };

  const onSubmit = async (producto) => {
    console.log(producto)
    const productoMejorado = {
      ...producto,
      imagen: producto.imagen[0]
    }
    if (titulo === "Crear producto") {
      //crear el producto nuevo
      const respuesta = await crearProducto(productoMejorado);
      if (respuesta.status === 201) {
        Swal.fire({
          title: "Producto creado",
          text: `El producto ${producto.nombreProducto} fue creado correctamente.`,
          icon: "success",
        });
        //resetear el formulario
        reset();
      }else{
        const datosErroneos = await respuesta.json()
         Swal.fire({
          title: "Ocurrio un error",
          text: `El producto ${producto.nombreProducto} no pudo ser creado. ${datosErroneos[0].msg}`,
          icon: "error",
        });
      }
    } else {
      //tomar los del formulario 'producto'
      const respuesta = await editarProducto(productoMejorado, id);
      if (respuesta.status === 200) {
        Swal.fire({
          title: "Producto editado",
          text: `El producto ${producto.nombreProducto} fue editado correctamente.`,
          icon: "success",
        });
        // redireccionar a la pagina del administrador
        navegacion("/administrador");
      }else{
         const datosErroneos = await respuesta.json()
         Swal.fire({
          title: "Ocurrio un error",
          text: `El producto ${producto.nombreProducto} no pudo ser editado. ${datosErroneos[0].msg}`,
          icon: "error",
        });
      }
    }
  };

  return (
    <section className="container mainSection">
      <h1 className="display-4 mt-5">{titulo}</h1>
      <hr />
      <Form className="my-4" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formNombreProdcuto">
          <Form.Label>Producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Cafe"
            {...register("nombreProducto", {
              required: "El nombre del producto es un dato obligatorio",
              minLength: {
                value: 2,
                message:
                  "El nombre del producto debe tener almenos 2 caracteres",
              },
              maxLength: {
                value: 100,
                message:
                  "El nombre del producto debe tener como maximo 100 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.nombreProducto?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 50"
            step="0.01"
            {...register("precio", {
              required: "El precio es un valor obligatorio",
              min: {
                value: 50,
                message:
                  "El precio minimo del producto debe ser de almenos $50",
              },
              max: {
                value: 1000000,
                message:
                  "El precio maximo de un producto debe ser de hasta $1000000",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.precio?.message}
          </Form.Text>
        </Form.Group>
       <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            {...register("imagen", {
              required:
                titulo === "Crear producto"
                  ? "La imagen es obligatoria"
                  : false,
              validate: {
                fileSize: (files) =>
                  !files[0] ||
                  files[0].size <= 2 * 1024 * 1024 ||
                  "La imagen no debe superar los 2MB.",
              },
            })}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setPreview(URL.createObjectURL(file)); //crea una URL temporal en el navegador
              } else {
                setPreview("");
              }
            }}
          />
          {(preview || imagenActual) && (
            <div className="mb-2 position-relative d-inline-block mt-3">
              <img
                className="rounded-3 img-preview"
                src={preview || imagenActual}
                alt="Imagen"
              />
              <Button
                variant="light"
                size="sm"
                className="p-0 d-flex align-items-center justify-content-center shadow btn-img-preview"
                onClick={() => {
                  setPreview('');
                  setImagenActual('');
                  resetField('imagen');
                }}
              >
                <i className="bi bi-x fs-5 text-danger"></i>
              </Button>
            </div>
          )}
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Categoría*</Form.Label>
          <Form.Select
            {...register("categoria", {
              required: "Debe seleccionar una categoria",
            })}
          >
            <option value="">Seleccione una opcion</option>
            <option value="Infusiones">Infusiones</option>
            <option value="Batidos">Batidos</option>
            <option value="Dulce">Dulce</option>
            <option value="Salado">Salado</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.categoria?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Descripción breve*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Una taza de café suave y aromático."
            as="textarea"
            {...register("descripcion_breve", {
              required: "La descripción breve es un dato obligatorio",
              minLength: {
                value: 5,
                message: "La descrición breve debe tener almenos 5 caracteres",
              },
              maxLength: {
                value: 250,
                message:
                  "La descrición breve debe tener como máximo 250 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.descripcion_breve?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Descripción Amplia*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: El café americano es una bebida caliente que consiste en un espresso diluido con agua caliente, lo que resulta en una taza de café suave y aromático. Es una opción popular para aquellos que prefieren un café menos intenso que el espresso tradicional. Perfecto para disfrutar en cualquier momento del día."
            as="textarea"
            rows={4}
            {...register("descripcion_amplia", {
              required: "La descripción amplia es un dato obligatorio",
              minLength: {
                value: 10,
                message:
                  "La descrición amplia debe tener almenos 10 caracteres",
              },
              maxLength: {
                value: 500,
                message:
                  "La descrición amplia debe tener como máximo 500 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.descripcion_amplia?.message}
          </Form.Text>
        </Form.Group>
        <Button type="submit" variant="success">
          Guardar
        </Button>
      </Form>
    </section>
  );
};

export default FormularioProducto;
