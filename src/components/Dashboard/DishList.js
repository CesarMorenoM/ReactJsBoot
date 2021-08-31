import defaultImg from '../../static/default-img.jpg'
import './dishList.scss'

const DishList = ({ dishes, quantity }) => {
  return (
    <ol className='dishList'>
      {dishes.slice(0, quantity).map((dish, id) => {
        let dishImg = dish.image ? dish.image : defaultImg
        return (
          <li key={dish.id}>
            <div className='dishList__cover'>
              <span className='dishList__cover__number'>{id + 1}.</span>
              <img className='dishList__cover__img' src={dishImg} alt='img' />
            </div>
            <div>
              <p className='dishList__name'>{dish.name}</p>
              <p className='dishList__price'>{dish.sold}<span> / $ {dish.price} c/u</span></p>
            </div>
          </li>
        )
      }
      )}
    </ol>
  )
}

export default DishList
