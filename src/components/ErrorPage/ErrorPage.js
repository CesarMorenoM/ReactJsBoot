import React from 'react'
import { useHistory } from 'react-router-dom'
import bgImage from '../../static/background-restaurant.jpg'
import './errorPage.scss'

const ErrorPage = () => {
  const err = { num: 404, desc: 'Page not found' }
  const history = useHistory()
  return (
    <div className='errorPage' style={{ backgroundImage: `url(${bgImage})` }}>
      <h1 className='errorPage__title'>
        <i className="material-icons">error_outline</i>
        Error {err.num} : {err.desc}
      </h1>
      <button
        className='errorPage__button hvr-grow'
        onClick={() => history.push('/')}
      >Back to home</button>
    </div>
  )
}

export default ErrorPage
