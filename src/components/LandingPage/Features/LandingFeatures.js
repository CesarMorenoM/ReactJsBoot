import React from 'react'
import positionMarker from '../../../static/position-marker.svg'
import like from '../../../static/like.svg'
import valorations from '../../../static/valorations.svg'
import './landingFeatures.scss'

const LandingFeatures = () => {
  const features = [
    { id: 1, img: positionMarker, text: 'Encuentra el mejor restaurante cerca de tu ubicación' },
    { id: 2, img: like, text: 'Calidad en servicio y atención al comensal' },
    { id: 3, img: valorations, text: 'Reserva el mejor lugar con los mejores platos a tan solo un click' }
  ]

  return (
    <div className="features">
      {features.map(feature =>
        <div key={feature.id} className="features__item">
          <figure className="features__item__figure">
            <img src={feature.img} alt='feature' />
          </figure>
          <p className="features__item__desc">{feature.text}</p>
        </div>
      )}
    </div>
  )
}

export default LandingFeatures
