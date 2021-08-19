import { useForm } from "react-hook-form";
import './menuRegister.scss'

async function putData(id, datos, closeModal) {
  const res = await fetch(`https://6100c9a4bca46600171cf9be.mockapi.io/datosMenu/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: datos.nombre,
      precio: datos.precio,
      imagenProducto: datos.imagenProducto,
      ingredientes: datos.ingredientes,
      proteina: datos.proteina,
      categoria: datos.categoria,
      'calorias-min': datos['calorias-min'],
      'calorias-max': datos['calorias-max'],
      grasas: datos.grasas,
      azucares: datos.azucares,
      id: datos.id

    })
  });
  res.json()
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
}
const MenuRegister = ({ plato, closeModal }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    if (typeof plato === 'number') {
      data.habilitado = true
      data.id = plato
      putData(plato, data, closeModal)
    } else {
      putData(plato.id, data, closeModal)
    }
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

    <form className='menuRegister' onSubmit={handleSubmit(onSubmit)}>

      {/* Imagen del producto */}
      <div className="plato">
        <div className="plato-figura">
          <label className="plato-figura-label" htmlFor="plato-figura-imagen">
            Subir imagen
          </label>
          <input id="plato-figura-imagen" type="file" alt="Imagen del producto" {...register("imagenProducto")} />
        </div>

        <div className="plato-detalle">
          {/* Nombre */}
          {/* register your input into the hook by invoking the "register" function */}
          <input className="plato-detalle-nombre" defaultValue={plato ? plato.nombre : ''} placeholder="Nombre del plato" {...register("nombre", { required: true })} />

          {/* Precio */}
          {/* include validation with required or other standard HTML validation rules */}
          <input className="plato-detalle-precio" defaultValue={plato ? plato.precio : ''} placeholder="Precio" {...register("precio", { required: true, valueAsNumber: true })} />

          {/* Ingrediente */}
          <textarea className="plato-detalle-descripcion" defaultValue={plato ? plato.ingredientes : ''} placeholder="Sushi con relleno de ..." {...register("ingredientes")} />

          {/* Categoria */}
          <select className="plato-detalle-categoria" defaultValue={plato ? plato.categoria : ''} id=""  {...register("categoría")}>
            <option value="Entrada">Entrada</option>
            <option value="Botana">Botana</option>
            <option value="Aperitivo">Aperitivo</option>
            <option value="Sopa">Sopa</option>
            <option value="Ensalada">Ensalada</option>
            <option value="Plato principal">Plato principal</option>
            <option value="Postre">Postre</option>
            <option value="Bebida">Bebida</option>
          </select>

          {/* Calorias */}
          <div className="plato-detalle-calorias">
            <label style={{ display: "block" }} >Calorías</label>
            <input defaultValue={plato ? plato['calorias-min'] : ''} placeholder="0" style={{ width: "30px" }} {...register("calorias-min", { required: true, valueAsNumber: true })} />
            <span>{' '}-{' '}</span>
            <input defaultValue={plato ? plato['calorias-max'] : ''} placeholder="0" style={{ width: "30px" }}  {...register("calorias-max", { required: true, valueAsNumber: true })} />
          </div>

          <div className="plato-detalle-informacion_nutricional">

            {/* Proteina */}
            <div className="plato-detalle-proteina">
              <label>Proteina</label>
              <input type="number" defaultValue={plato ? plato.proteina : ''} placeholder="0" style={{ width: "50px" }}  {...register("proteina", { required: true, valueAsNumber: true })} />
            </div>

            {/* Grasas */}
            <div className="plato-detalle-grasas">
              <label>Grasas</label>
              <input type="number" defaultValue={plato ? plato.grasas : ''} placeholder="0" style={{ width: "50px" }}  {...register("grasas", { required: true, valueAsNumber: true })} />
            </div>

            {/* Azucares */}
            <div className="plato-detalle-azucares">
              <label>Azucares</label>
              <input type="number" defaultValue={plato ? plato.azucares : ''} placeholder="0" style={{ width: "50px" }}  {...register("azucares", { required: true, valueAsNumber: true })} />
            </div>

          </div>
        </div>
      </div>

      <div className="form-buttons">
        <button className="form-buttons-cancelar" onClick={closeModal}>Cancelar</button>
        <button className="form-buttons-agregar " type="submit">Agregar</button>
      </div>

      {/* errors will return when field validation fails  */}
      {errors.lastname && <span>This field is required</span>}


    </form>
  );
}

export default MenuRegister