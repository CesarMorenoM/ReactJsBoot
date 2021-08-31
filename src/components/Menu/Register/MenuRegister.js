//libraries
import { useContext } from "react";
import { useForm } from "react-hook-form";
//personal
import MenuContext from "../../../context/MenuContext/MenuContext";
//images
import defaultImg from '../../../static/default-img.jpg'
import './menuRegister.scss'

const MenuRegister = ({ dish, closeModal, branch, action }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { updateDishInfo, addDish } = useContext(MenuContext)

  if (!dish) dish = {}

  const updateDishHandler = data => {
    updateDishInfo(dish.id, branch.id, data)
    closeModal()
  }

  const addDishHandler = data => {
    addDish(branch.id, data)
    closeModal()
  }

  return (
    <form className='menuRegister' onSubmit={action === 'Edit' ? handleSubmit(updateDishHandler) : handleSubmit(addDishHandler)}>

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
            <option value="Inlet">Inlet</option>
            <option value="Snack">Snack</option>
            <option value="Soup">Soup</option>
            <option value="Salad">Salad</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Drink">Drink</option>
          </select>
        </div>

        {/* Ingredients */}
        <label className="dish__label">Ingredients<span>Separated by commas</span></label>
        <textarea className=' input' placeholder="Salt , Sugar , Love ..."
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
          <label className="dish__label">Image</label>
          <img src={dish.image || defaultImg} alt='Dish' />
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