import { useEffect, useState } from 'react'
import Loader from '../../Common/Loader/Loader'

import './landingRecommended.scss'

const LandingRecommended = () => {
  const [recommendations, setRecommendations] = useState()

  useEffect(() => {
    //The recommendation carrousel only support 6 recommendations for the moment (no reactive)
    fetch('https://610d6bcd48beae001747b83c.mockapi.io/recommendation')
      .then(data => data.json())
      .then(recommends => setRecommendations(recommends))
  }, [])

  if (!recommendations) return <Loader />
  return (
    <section className='recommended'>

      <h1 className='recommended__title'>Recommended</h1>

      <div className="slider">
        <div className="slide-track">

          {[...recommendations, ...recommendations].map((restaurant, id) =>
            <div key={id} className='slide'>
              <div className="item" style={{ backgroundImage: `url(${restaurant.img})` }}>
                <div className="item__header">
                  <h2 className="item__header__name"><i className="material-icons">location_on</i>{restaurant.name}</h2>
                  <i className="item__header__fav material-icons">star_border</i>
                </div>
                <div className="item__footer">
                  <div className="item__footer__data">
                    <p className="--imp">From ${restaurant.minValue}</p>
                    <p>{restaurant.address}</p>
                    <p>Tel:351354</p>
                  </div>
                  <div className="item__footer__buttons">
                    <button >Go</button>
                    <button >Reserve</button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  )
}

export default LandingRecommended
