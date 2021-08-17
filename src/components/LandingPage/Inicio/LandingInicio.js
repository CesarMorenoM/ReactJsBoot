import React from 'react'
import NavBar from '../../Common/NavBar/NavBar'
import bgImage from '../../../static/background-restaurant.jpg'
import './landingInicio.scss'

const LandingInicio = () => {
  return (
    <div className="landing" style={{ backgroundImage: `url(${bgImage})` }}>
      <NavBar logged={false} />
      <div className="landing__title">
        <h1>Registra tu restaurante en el mejor buscador para tus comensales</h1>
        <button className="landing__title__button hvr-grow">Registrar restaurante</button>
      </div>
    </div>
  )
}

export default LandingInicio
