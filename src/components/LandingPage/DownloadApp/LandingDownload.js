import previewApp from '../../../static/preview-app.jpg'
import androidApp from '../../../static/android-app.png'
import appleApp from '../../../static/apple-app.png'
import './landingDownload.scss'

const LandingDownload = () => {
  return (
    <div className="download-app">
      <figure className="download-app__image">
        <img src={previewApp} alt="" />
      </figure>
      <div className="download-app__desc">
        <h2 className="download-app__desc__text" >Download our app and enjoy the best restaurants in town</h2>
        <div className="download-app__desc__logos">
          <img src={androidApp} alt="android" />
          <img src={appleApp} alt="apple" />
        </div>
      </div>
    </div>
  )
}

export default LandingDownload
