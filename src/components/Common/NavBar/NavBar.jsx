//libraries
import { useContext, useState } from "react"
import { NavLink, useHistory } from "react-router-dom"
import PropTypes from 'prop-types'
//personal
import UserContext from "../../../context/UserContext/UserContext"
//images
import logo from "../../../static/logo.svg"
//components
import MenuNavBar from "./Menu/MenuNavBar"
import "./nav-bar.scss"

const NavBar = ({ logged }) => {
  const history = useHistory()
  const [menuToggle, setMenuToggle] = useState(false)
  const { user } = useContext(UserContext)

  const createLogged = () => {
    return (
      <div className="nav-bar__user">
        <i className=" nav-bar__user__icon material-icons">
          notifications
        </i>
        <h2 className=" nav-bar__user__name">{user.name}</h2>
        <div
          className="nav-bar__user__img"
          style={{ backgroundImage: `url(${user.avatar})` }}
          onClick={() => setMenuToggle(!menuToggle)}
        ></div>
      </div>
    )
  }

  return (
    <>
      <nav className={`nav-bar ${!logged ? "--init" : ""}`} id="inicio">
        <NavLink to="/">
          <img className="nav-bar__title" src={logo} alt="logo" />
        </NavLink>
        {logged ? (
          createLogged()
        ) : (
          <button
            className="nav-bar__login hvr-br-to-right"
            onClick={() => history.push("/login")}
          >
            {" "}
            Log In{" "}
          </button>
        )}
      </nav>
      <MenuNavBar menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
    </>
  )
}

NavBar.propTypes = {
  /**Is the user logged? */
  logged: PropTypes.bool
}

export default NavBar
