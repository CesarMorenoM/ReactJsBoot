import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../../../context/UserContext/UserContext";
import "./menuNavBar.scss";

const Menu = ({ menuToggle, setMenuToggle }) => {
    const { logOut, isFranchise } = useContext(UserContext);

    // Select the link that will appear based on if it is a franchise or not
    const type = isFranchise
        ? { name: "Branches", path: "/branches", icon: "domain" }
        : { name: "Menu", path: "/menu", icon: "dns" };

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
    ];

    // Close menu with scrolling or click
    useEffect(() => {
        const changeToggle = () => setMenuToggle(!menuToggle);
        if (menuToggle) {
            document.addEventListener("scroll", changeToggle);
            document.addEventListener("click", changeToggle);
        }
        return () => {
            if (!!document.getElementById("Menu")) {
                document.removeEventListener("click", changeToggle);
                document.removeEventListener("scroll", changeToggle);
            }
        };
    }, [menuToggle, setMenuToggle]);

    // Manage the LogOut button
    useEffect(() => {
        const toggleLogOut = (e) => {
            e.stopPropagation();
            logOut();
            setMenuToggle(!menuToggle);
        };
        if (menuToggle)
            document
                .getElementById("LogOut")
                .addEventListener("click", toggleLogOut);
        return () => {
            if (document.getElementById("LogOut")) {
                document
                    .getElementById("LogOut")
                    .removeEventListener("click", toggleLogOut);
            }
        };
    }, [menuToggle, setMenuToggle, logOut]);

    //Component
    return (
        <div id="Menu" className={`menu ${menuToggle ? "--active" : ""}`}>
            <ul className="menu__list">
                {links.map((link, id) => (
                    <NavLink
                        exact
                        key={id}
                        to={link.path}
                        activeClassName="--active"
                        className="menu__list__item hvr-bg-to-right"
                    >
                        <i className="menu__list__item__icon material-icons">
                            {link.icon}
                        </i>
                        <p className="menu__list__item__title">{link.name}</p>
                    </NavLink>
                ))}
                <li id="LogOut" className="menu__list__item hvr-bg-to-right">
                    <i className="menu__list__item__icon material-icons">
                        exit_to_app
                    </i>
                    <p className="menu__list__item__title">Log Out</p>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
