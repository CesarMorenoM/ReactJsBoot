//libraries
import Flickity from 'flickity'
import { useEffect, useState } from 'react'
//components
import Loader from '../../Common/Loader/Loader'
import './landingRecommended.scss'

const LandingRecommended = () => {
  const API_URL = process.env.REACT_APP_MOCKAPI
  const [recommendations, setRecommendations] = useState()

  // Get the recommendations
  useEffect(() => {
    if (!recommendations) {
      fetch(`${API_URL}/recommendation`)
        .then(data => data.json())
        .then(recommends => setRecommendations(recommends))
    }
  }, [API_URL, recommendations])

  // Create the carrousel
  useEffect(() => {
    if (recommendations) {
      const $carrousel = document.querySelector('#carrousel')
      new Flickity($carrousel, {
        autoPlay: 2000,
        freeScroll: false,
        wrapAround: true,
        pauseAutoPlayOnHover: false,
        pageDots: false,
        prevNextButtons: false,
      })
    }
  }, [recommendations])

  if (!recommendations) return <Loader />
  return (
    <section className="recommended" id="recommendation">
      <h1 className="recommended__title">Recommended</h1>
      <div className="carousel" id="carrousel">
        {recommendations.map((restaurant, id) => (
          <div key={id} className="carousel__item" style={{ backgroundImage: `url(${restaurant.img})` }}>
            <div className="carousel__item__header">
              <h2 className="carousel__item__header__name">
                <i className="material-icons">location_on</i>
                {restaurant.name}
              </h2>
              <i className="carousel__item__header__fav material-icons">star_border</i>
            </div>
            <div className="carousel__item__footer">
              <div className="carousel__item__footer__data">
                <p className="--imp">From ${restaurant.minValue}</p>
                <p>{restaurant.address}</p>
                <p>Tel:351354</p>
              </div>
              <div className="carousel__item__footer__buttons">
                <button>Go</button>
                <button>Reserve</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default LandingRecommended
