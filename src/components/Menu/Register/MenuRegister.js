import { useContext } from "react";
import { useForm } from "react-hook-form";
import UserContext from "../../../context/UserContext/UserContext";
import './menuRegister.scss'

async function putData(userId, branchId, dishId, data) {
  fetch(`https://610d6bcd48beae001747b83c.mockapi.io/user/${userId}/branches/${branchId}/dishes/${dishId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      image: data.image,
      price: data.price,
      category: data.category,
      protein: data.protein,
      fats: data.fats,
      sugars: data.sugars,
      ingredients: data.ingredientes,
      calories: {
        min: data.calories.min,
        max: data.calories.max
      },
    })
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

const MenuRegister = ({ dish, closeModal, branch }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const { user } = useContext(UserContext)

  const onSubmit = data => {
    putData(user.id, branch.id, dish.id, data, closeModal)
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

    <form className='menuRegister' onSubmit={handleSubmit(onSubmit)}>

      {/* Imagen del producto */}
      <div className="dish">
        <div className="dish__image">
          <label className="dish__image__label" htmlFor="plato-figura-imagen">
            Add image
          </label>
          <input id="plato-figura-imagen" type="file" alt="Image" {...register("image")} />
        </div>

        <div className="plato-detalle">
          {/* Nombre */}
          {/* register your input into the hook by invoking the "register" function */}
          <input className="plato-detalle-nombre" defaultValue={dish ? dish.name : ''} placeholder="Nombre del plato" {...register("name", { required: true })} />

          {/* Precio */}
          {/* include validation with required or other standard HTML validation rules */}
          <input className="plato-detalle-precio" defaultValue={dish ? dish.price : ''} placeholder="Price" {...register("price", { required: true, valueAsNumber: true })} />

          {/* Ingrediente */}
          <textarea className="plato-detalle-descripcion" defaultValue={dish ? dish.ingredients : ''} placeholder="Description" {...register("ingredients")} />

          {/* Categoria */}
          <select className="plato-detalle-categoria" defaultValue={dish ? dish.category : ''} id=""  {...register("category")}>
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
          {/* <div className="plato-detalle-calorias">
            <label style={{ display: "block" }} >Calorías</label>
            <input defaultValue={dish ? dish.calories.min : ''} placeholder="0" style={{ width: "30px" }} {...register("calories.min", { required: true, valueAsNumber: true })} />
            <span>{' '}-{' '}</span>
            <input defaultValue={dish ? dish.calories.max : ''} placeholder="0" style={{ width: "30px" }}  {...register("calorias-max", { required: true, valueAsNumber: true })} />
          </div> */}

          <div className="plato-detalle-informacion_nutricional">

            {/* Proteina */}
            <div className="plato-detalle-proteina">
              <label>Proteina</label>
              <input type="number" defaultValue={dish ? dish.protein : ''} placeholder="0" style={{ width: "50px" }}  {...register("proteina", { required: true, valueAsNumber: true })} />
            </div>

            {/* Grasas */}
            <div className="plato-detalle-grasas">
              <label>Grasas</label>
              <input type="number" defaultValue={dish ? dish.fats : ''} placeholder="0" style={{ width: "50px" }}  {...register("grasas", { required: true, valueAsNumber: true })} />
            </div>

            {/* Azucares */}
            <div className="plato-detalle-azucares">
              <label>Azucares</label>
              <input type="number" defaultValue={dish ? dish.sugars : ''} placeholder="0" style={{ width: "50px" }}  {...register("azucares", { required: true, valueAsNumber: true })} />
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