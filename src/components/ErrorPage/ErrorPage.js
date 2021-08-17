import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import './errorPage.scss'

const ErrorPage = () => {
  const err = { num: 404, desc: 'Page not found' }
  const history = useHistory()
  return (
    <div className='errorPage'>
      <h1>
        <i className="material-icons">error_outline</i>
        Error {err.num} : {err.desc}
      </h1>
      <NavLink
        to='/'
      >Back to home</NavLink>
      <button
        onClick={() => history.push('/')}
      >Back to home</button>
    </div>
  )
}

export default ErrorPage
