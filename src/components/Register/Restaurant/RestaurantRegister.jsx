import { useForm } from 'react-hook-form'
import defaultImg from '../../../static/default-img.jpg'
import './restaurantRegister.scss'

const RestaurantRegister = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const addRestaurant = data => {
    console.log(data)
  }

  return (
    <form id='restaurantRegister' onSubmit={handleSubmit(addRestaurant)} className="restaurantRegister">
      <div className="restaurantRegister__main">
        <label className='label --first' >Restaurant's name</label>
        <input className='input' type="text" placeholder='Name of the restaurant'
          {...register('name', { required: `You may put the restaurant's name` })}
        />
        <span className="error">{errors?.name?.message}</span>

        <label className='label' >Restaurant's address</label>
        <input className='input' type="address" placeholder='Where is your restaurant'
          {...register('address', { required: 'You may put the address' })}
        />
        <span className="error">{errors?.address?.message}</span>

        <div className="fill">
          <label className="label"> Restaurant's phone</label>
          <label className="label"> Restaurant's category</label>
          <input className='input' type='phone' placeholder='Telephone number' />
          <select className='input' name="" id="">
            <option value="Inlet">Inlet</option>
            <option value="Snack">Snack</option>
            <option value="Soup">Soup</option>
            <option value="Salad">Salad</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Drink">Drink</option>
          </select>
        </div>
      </div>
      <div className="restaurantRegister__side">
        <label className="label">Restaurant's picture</label>
        <img src={defaultImg} alt="" />
        <input className="menuRegister__image__button" type="text" name='picture'
          {...register("image")}
        />
      </div>
    </form>
  )
}

export default RestaurantRegister
