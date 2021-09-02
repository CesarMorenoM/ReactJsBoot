import bgImage from '../../../static/background-restaurant.jpg'
//components
import NavBar from '../../Common/NavBar/NavBar'
import Divider from '../../Common/Divider/Divider'
import './landingInicio.scss'
import { useHistory } from 'react-router-dom'

const LandingInicio = () => {
  const history = useHistory()

  const handleRegister = () => {
    history.push('/register')
  }

  return (
    <div className="landing" style={{ backgroundImage: `url(${bgImage})` }}>
      <Divider />
      <NavBar logged={false} />
      <div className="landing__title">
        <h1>Register your restaurant in the best search engine for your diners</h1>
        <button className="landing__title__button hvr-grow" onClick={handleRegister} >Register restaurant</button>
      </div>
    </div>
  )
}

export default LandingInicio
