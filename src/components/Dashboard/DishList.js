import React from 'react'
import './dishList.scss'

const DishList = ({ dishes, quantity }) => {
  return (
    <ul className='dishList'>
      {dishes.slice(0, quantity).map(dish => {
        let dishImg = dish.image ? dish.image : 'https://parade.com/wp-content/uploads/2014/05/epicurious-tidal.jpg'
        return (
          <li key={dish.id}>
            <div className='dishList__img' style={{ backgroundImage: `url(${dishImg})` }}></div>
            <div>
              <p className='dishList__name'>{dish.name}</p>
              <p className='dishList__price'>{dish.sold}<span> / $ {dish.price}</span></p>
            </div>
          </li>
        )
      }
      )}
    </ul>
  )
}

export default DishList
