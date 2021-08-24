import { useContext } from "react";
import { useForm } from "react-hook-form";
import MenuContext from "../../../context/MenuContext/MenuContext";
import './menuRegister.scss'

const MenuRegister = ({ dish, closeModal, branch, action }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { updateDishInfo } = useContext(MenuContext)

  if (!dish) dish = {}


  const updateDish = data => {
    updateDishInfo(dish.id, branch.id, data)
    closeModal()
  }
  const addDish = data => {
    console.log(data)
  }

  return (
    <form className='menuRegister' onSubmit={action === 'Edit' ? handleSubmit(updateDish) : handleSubmit(addDish)}>

      {/* Mainsection */}
      <div className="dish">

        {/* Name */}
        <label className="dish__label">Name</label>
        <input className=" input" placeholder="Dish name"
          defaultValue={dish.name || ''}
          {...register("name", { required: true })} />

        <div className="dish__general">
          <label className="dish__label">Price</label>
          <label className="dish__label">Category</label>

          {/* Price */}
          <input className="dish__general__price input" placeholder="Price"
            defaultValue={dish.price || ''}
            {...register("price", { required: true, valueAsNumber: true })} />

          {/* Categories */}
          <select className="input"
            defaultValue={dish.category || ''}
            {...register("category")}>
            <option value="Entrada">Entrada</option>
            <option value="Botana">Botana</option>
            <option value="Aperitivo">Aperitivo</option>
            <option value="Sopa">Sopa</option>
            <option value="Ensalada">Ensalada</option>
            <option value="Plato principal">Plato principal</option>
            <option value="Postre">Postre</option>
            <option value="Bebida">Bebida</option>
          </select>
        </div>

        {/* Ingredients */}
        <label className="dish__label">Ingredients<span>Separated by commas</span></label>
        <textarea className=' input' placeholder="Description"
          defaultValue={dish.ingredients || ''}
          {...register("ingredients")} />

        {/* Nutrition section */}
        <details className="dish__nutrition">
          <summary className="dish__label">
            Health Information
          </summary>

          <div className="dish__info">
            {/* Calorias */}
            <label className="dish__label">Calories</label>
            <div className="dish__info__calories">
              <input type="number" className="input" placeholder="--"
                defaultValue={dish.calories ? dish.calories.min : ''}
                {...register("calories.min", { valueAsNumber: true })} />
              <span> - </span>
              <input type="number" className="input" placeholder="--"
                defaultValue={dish.calories ? dish.calories.max : ''}
                {...register("calories.max", { valueAsNumber: true })} />
            </div>

            {/* Protein */}
            <label className="dish__label">Proteins</label>
            <input type="number" placeholder="--" className="input"
              defaultValue={dish.protein || ''}
              {...register("protein", { valueAsNumber: true })} />

            {/* Fats */}
            <label className="dish__label">Fats</label>
            <input type="number" placeholder="--" className="input"
              defaultValue={dish.fats || ''}
              {...register("fats", { valueAsNumber: true })} />

            {/* Sugars */}
            <label className="dish__label">Sugars</label>
            <input type="number" placeholder="--" className="input"
              defaultValue={dish.sugars || ''}
              {...register("sugars", { valueAsNumber: true })} />

          </div>

        </details>
      </div>

      {/* Side section */}
      <div className='menuRegister__side'>
        <div className="menuRegister__image">
          <img src={dish.image || ''} alt='Dish' />
          <input className="menuRegister__image__button" type="text" name='picture'
            defaultValue={dish.image || ''}
            {...register("image")}
          />
        </div>
        {/* Buttons section */}
        <div className="menuRegister__buttons">
          <button className="menuRegister__buttons__cancel" onClick={closeModal}>Cancel</button>
          <button className="menuRegister__buttons__add " type="submit">
            {action === 'Edit'
              ? 'Update'
              : 'Add'}
          </button>
        </div>

      </div>



      {/* Error handling */}
      {errors.lastname && <span>This field is required</span>}


    </form>
  );
}

export default MenuRegister