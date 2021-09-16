import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import UserContext from '../../../context/UserContext/UserContext'
import defaultImg from '../../../static/default-img.jpg'
import './restaurantRegister.scss'

const RestaurantRegister = ({ restaurant }) => {
  const { resCategories } = useContext(UserContext)
  const { register, handleSubmit, formState: { errors } } = useForm()

  if (!restaurant) restaurant = {}
  const addRestaurant = data => {
    console.log(data)
  }

  return (
    <form id='restaurantRegister' onSubmit={handleSubmit(addRestaurant)} className="restaurantRegister">
      <div className="restaurantRegister__main">
        <label className='label --first' >Restaurant's name</label>
        <input className='input' type="text" readOnly={!restaurant.isMain}
          placeholder='Name of the restaurant' defaultValue={restaurant.name || ''}
          {...register('name', { required: `You may put the restaurant's name` })}
        />
        <span className="error">{errors?.name?.message}</span>

        <label className='label' >Restaurant's address</label>
        <input className='input' type="address" readOnly={!restaurant.isMain}
          placeholder='Where is your restaurant' defaultValue={restaurant.address || ''}
          {...register('address', { required: 'You may put the address' })}
        />
        <span className="error">{errors?.address?.message}</span>

        <div className="fill">
          <label className="label"> Restaurant's phone</label>
          <label className="label"> Restaurant's category</label>
          <input className='input' type='phone' readOnly={!restaurant.isMain}
            placeholder='Telephone number' defaultValue={restaurant.phone || ''} />
          <select className='input' readOnly={!restaurant.isMain}
            defaultValue={restaurant.restaurantCategoryId || ''}
            {...register("restaurantCategoryId")}>
            {
              resCategories.map(category =>
                <option key={category.id} value={category.id}>{category.name}</option>
              )
            }
          </select>
        </div>
      </div>
      <div className="restaurantRegister__side">
        <label className="label">Restaurant's picture</label>
        <img src={restaurant.image || defaultImg} alt="" />
        <input className="menuRegister__image__button" type="text" name='picture' readOnly={!restaurant.isMain}
          {...register("image")}
        />
      </div>
    </form>
  )
}

export default RestaurantRegister
