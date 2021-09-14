//libraries
import PropTypes from 'prop-types'
//images
import defaultImg from "../../../static/default-img.jpg"
import "./dishList.scss"

const DishList = ({ dishes, quantity }) => {
  return (
    <ol className='dishList'>
      {dishes.slice(0, quantity).map((dish, id) => {
        let dishImg = dish.pathImage ? dish.pathImage : defaultImg
        return (
          <li key={id}>
            <div className='dishList__cover'>
              <span className='dishList__cover__number'>{id + 1}.</span>
              <img className='dishList__cover__img' src={dishImg} alt='img' />
            </div>
            <div>
              <p className='dishList__name'>{dish.name}</p>
              <p className='dishList__price'>
                <span> $ {dish.price} c/u</span>
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

DishList.propTypes = {
  /**List of dishes we want to print */
  dishes: PropTypes.array.isRequired,
  /**How many dishes we want to print */
  quantity: PropTypes.number
}

export default DishList
