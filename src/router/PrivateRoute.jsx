import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import NavBar from '../components/Common/NavBar/NavBar'
import Footer from '../components/Common/Footer/Footer'
import UserContext from '../context/UserContext/UserContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useContext(UserContext)

  return (
    <Route {...rest}
      render={() =>
        isAuth()
          ? (
            <>
              <NavBar logged={true} />
              <Component />
              <Footer />
            </>
          )
          : <Redirect to='/home' />
      }
    />
  )
}

export default PrivateRoute
