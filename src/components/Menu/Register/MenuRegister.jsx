//libraries
import { useContext } from "react"
import { useForm } from "react-hook-form"
import PropTypes from 'prop-types'
//personal
import UserContext from "../../../context/UserContext/UserContext"
//images
import defaultImg from '../../../static/default-img.jpg'
import './menuRegister.scss'

const MenuRegister = ({ dish, closeModal, branch, action, registerType }) => {
  const { register, handleSubmit } = useForm()
  const { updateDishInfo, addDish } = useContext(UserContext)

  if (!dish) dish = {}

  const updateDishHandler = data => {
    updateDishInfo(dish.id, branch.id, data)
    if (!registerType) closeModal()
  }

  const addDishHandler = data => {
    addDish(branch.id, data)
    if (!registerType) closeModal()
  }

  return (
    <form id='dishRegister' className={`menuRegister ${registerType ? '--register' : ''}`}
      onSubmit={action === 'Edit' ? handleSubmit(updateDishHandler) : handleSubmit(addDishHandler)}>

      {/* Mainsection */}
      <div className="dish">

        {/* Name */}
        <label className="label --first">Name</label>
        <input className="input" placeholder="Dish name"
          defaultValue={dish.name || ''}
          {...register("name", { required: true })} />

        <div className="fill">
          <label className="label">Price</label>
          <label className="label">Category</label>

          {/* Price */}
          <input className="input" placeholder="Price"
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
        <label className="label">Ingredients<span>Separated by commas</span></label>
        <textarea className=' input' placeholder="Salt , Sugar , Love ..."
          defaultValue={dish.ingredients || ''}
          {...register("ingredients")} />

        {/* Nutrition section */}
        <details className="dish__nutrition" open>
          <summary className="label">
            Health Information
          </summary>

          <div className="dish__info">
            {/* Calorias */}
            <label className="label">Calories</label>
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
            <label className="label">Proteins</label>
            <input type="number" placeholder="--" className="input"
              defaultValue={dish.protein || ''}
              {...register("protein", { valueAsNumber: true })} />

            {/* Fats */}
            <label className="label">Fats</label>
            <input type="number" placeholder="--" className="input"
              defaultValue={dish.fats || ''}
              {...register("fats", { valueAsNumber: true })} />

            {/* Sugars */}
            <label className="label">Sugars</label>
            <input type="number" placeholder="--" className="input"
              defaultValue={dish.sugars || ''}
              {...register("sugars", { valueAsNumber: true })} />

          </div>

        </details>
      </div>

      <div className='menuRegister__side'>
        <div className="menuRegister__image">
          <label className="label">Image</label>
          <img src={dish.image || defaultImg} alt='Dish' />
          <input className="menuRegister__image__button" type="text" name='picture'
            defaultValue={dish.image || ''}
            {...register("image")}
          />
        </div>

        <div className="menuRegister__buttons">
          <button className="menuRegister__buttons__cancel" onClick={closeModal}>Cancel</button>
          <button className="menuRegister__buttons__add" id='sendDishRegister' type="submit">
            {action === 'Edit'
              ? 'Update'
              : 'Add'}
          </button>
        </div>

      </div>

    </form>
  )
}

MenuRegister.propTypes = {
  /**The Information of the dish */
  dish: PropTypes.object,
  /**The function to close the modal */
  closeModal: PropTypes.func,
  /**The current Branch */
  branch: PropTypes.object.isRequired,
  /**The type of modal that will be */
  action: PropTypes.string,
  /**Is in a register type? */
  registerType: PropTypes.bool
}

export default MenuRegister