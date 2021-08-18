import Inicio from './Inicio/LandingInicio'
import Features from './Features/LandingFeatures'
import Recommended from './Recommended/LandingRecommended'
import Download from './DownloadApp/LandingDownload'
import Contact from './Contact/LandingContact'
import Footer from '../Common/Footer/Footer'
import './landingPage.scss'

const LandingPage = () => {
  return (
    <>
      <Inicio />
      <Features />
      <Recommended />
      <Download />
      <Contact />
      <Footer />
    </>
  )
}

export default LandingPage
