//libraries
import { useContext, useEffect } from "react"
import { NavLink } from "react-router-dom"
import PropTypes from 'prop-types'
//personal
import UserContext from "../../../../context/UserContext/UserContext"
import "./menuNavBar.scss"

const MenuNavBar = ({ menuToggle, setMenuToggle }) => {
  const { logOut, isFranchise } = useContext(UserContext)

  // Select the link that will appear based on if it is a franchise or not
  const type = isFranchise
    ? { name: "Branches", path: "/branches", icon: "domain" }
    : { name: "Menu", path: "/menu", icon: "dns" }

  //Wich links will appear in the menu
  const links = [
    { name: "Profile", path: "/profile", icon: "person" },
    { name: "Dashboard", path: "/dashboard", icon: "view_quilt" },
    { ...type },
    {
      name: "Reservations",
      path: "/reservations",
      icon: "chrome_reader_mode",
    },
    { name: "Configuration", path: "/config", icon: "settings" },
  ]

  // Close menu with scrolling or click
  useEffect(() => {
    const changeToggle = () => setMenuToggle(!menuToggle)
    if (menuToggle) {
      document.addEventListener("scroll", changeToggle)
      document.addEventListener("click", changeToggle)
    }
    return () => {
      if (!!document.getElementById("Menu")) {
        document.removeEventListener("click", changeToggle)
        document.removeEventListener("scroll", changeToggle)
      }
    }
  }, [menuToggle, setMenuToggle])

  // Manage the LogOut button
  useEffect(() => {
    const toggleLogOut = (e) => {
      e.stopPropagation()
      logOut()
      setMenuToggle(!menuToggle)
    }
    if (menuToggle)
      document
        .getElementById("LogOut")
        .addEventListener("click", toggleLogOut)
    return () => {
      if (document.getElementById("LogOut")) {
        document
          .getElementById("LogOut")
          .removeEventListener("click", toggleLogOut)
      }
    }
  }, [menuToggle, setMenuToggle, logOut])

  //Component
  return (
    <div id="Menu" className={`menuNavBar ${menuToggle ? "--active" : ""}`}>
      <ul className="menuNavBar__list">
        {links.map((link, id) => (
          <NavLink key={id} to={link.path} activeClassName="--active" className="menuNavBar__list__item hvr-bg-to-right">
            <i className="menuNavBar__list__item__icon material-icons">{link.icon}</i>
            <p className="menuNavBar__list__item__title">{link.name}</p>
          </NavLink>
        ))}
        <li id="LogOut" className="menuNavBar__list__item hvr-bg-to-right">
          <i className="menuNavBar__list__item__icon material-icons">exit_to_app</i>
          <p className="menuNavBar__list__item__title">Log Out</p>
        </li>
      </ul>
    </div>
  )
}

MenuNavBar.propTypes = {
  /**Is the menu open? */
  menuToggle: PropTypes.bool,
  /**Function to manage the open and close of the menu */
  setMenuToggle: PropTypes.func
}

export default MenuNavBar
