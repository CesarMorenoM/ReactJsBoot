//images
import positionMarker from '../../../static/position-marker.svg'
import like from '../../../static/like.svg'
import valorations from '../../../static/valorations.svg'
import './landingFeatures.scss'

const LandingFeatures = () => {
  const features = [
    { id: 1, img: positionMarker, text: 'Find the best restaurant near your location' },
    { id: 2, img: like, text: 'Quality service and customer care' },
    { id: 3, img: valorations, text: 'Book the best place with the best dishes just a click away.' }
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
