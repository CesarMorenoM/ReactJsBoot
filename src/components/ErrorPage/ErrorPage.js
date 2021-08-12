import React from 'react'
import './errorPage.scss'

const ErrorPage = () => {
  const err = { num: 404, desc: 'Page not found' }
  return (
    <div className='errorPage'>
      <h1>
        <i className="material-icons">error_outline</i>
        Error {err.num} : {err.desc}
      </h1>
    </div>
  )
}

export default ErrorPage
