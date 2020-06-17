import React, { useContext } from "react";
import { Navbar, NavbarBrand, NavItem, Nav } from "reactstrap";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { IoLogoUsd } from "react-icons/io";
import { OrganiserContext } from "../../Context/Context";
import { USER_AUTH } from "../../Context/ActionTypes";

function NavBar() {
  const { state, dispatch } = useContext(OrganiserContext);
  const userlogout = () => {
    dispatch({
      type: USER_AUTH,
      setUser: null,
    });
  };

  return (
    <div className={styles.navbar}>
      <Navbar className={styles.navbarContainer}>
        <NavbarBrand>
          {state.setUser !== null && state.setUser !== undefined ? (
            <NavLink
              to={`/${state.setUser.email}/boards`}
              className="text-white"
              style={{ textDecoration: "none" }}
            >
              Pro-Organiser
            </NavLink>
          ) : (
            <NavLink
              to="/"
              className="text-white"
              style={{ textDecoration: "none" }}
            >
              Pro-Organiser
            </NavLink>
          )}
        </NavbarBrand>
        <Nav>
          <NavItem className={styles.home}>
            {state.setUser !== null && state.setUser !== undefined ? (
              <NavLink
                to={`/${state.setUser.email}/boards`}
                className="text-white"
                style={{ textDecoration: "none" }}
                activeClassName={styles.active}
              >
                Home
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="text-white"
                style={{ textDecoration: "none" }}
                activeClassName={styles.active}
              >
                Log In
              </NavLink>
            )}
          </NavItem>
          <NavItem className={styles.createBoard}>
            {state.setUser !== null && state.setUser !== undefined ? (
              <NavLink
                to={`/${state.setUser.email}/createBoard`}
                className="text-white"
                activeStyle={{ color: "red" }}
                style={{ textDecoration: "none" }}
                activeClassName={styles.active}
              >
                Create Board
              </NavLink>
            ) : (
              <NavLink
                to="/signup"
                className="text-white"
                style={{ textDecoration: "none" }}
                activeClassName={styles.active}
              >
                Sign In
              </NavLink>
            )}
          </NavItem>
          {state.setUser !== null && state.setUser !== undefined ? (
            <NavItem className={styles.login}>
              <NavLink
                onClick={(e) => userlogout(e)}
                to="/"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                Logout
              </NavLink>
            </NavItem>
          ) : null}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
