import React, { Fragment } from "react";
import styles from "./LandingPage.module.css";
import {
  Button,
  Row,
  Col,
  Nav,
  Navbar,
  NavItem,
  NavbarBrand,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { IoMdCheckmarkCircle } from "react-icons/io";
import NavBar from "../../Layout/NavBar/NavBar";

const LandingPage = () => {
  let history = useHistory();

  const GotoSignup = () => {
    history.replace("/signup");
  };
  return (
    <Fragment>
      <NavBar></NavBar>
      <div className={styles.Container}>
        <div className={styles.landingPage}>
          <div className={styles.LeftSide}>
            <div>
              <p className={styles.mainText}>
                Dynamic communication through knowledge sharing and Productive
                collaboration
              </p>
            </div>
            <div className={styles.ListContainer}>
              <ul className={styles.listItems}>
                <li className={styles.listItem}>
                  <IoMdCheckmarkCircle
                    color="#FFA4A4"
                    style={{ marginRight: "5px" }}
                  />
                  Fewer meetings
                </li>
                <li className={styles.listItem}>
                  <IoMdCheckmarkCircle
                    color="#FFA4A4"
                    style={{ marginRight: "5px" }}
                  />
                  Less email
                </li>
                <li className={styles.listItem}>
                  <IoMdCheckmarkCircle
                    color="#FFA4A4"
                    style={{ marginRight: "5px" }}
                  />
                  Higher productivity
                </li>
              </ul>
            </div>
            <div className={styles.SignupButtonContainer}>
              <Button
                onClick={() => GotoSignup()}
                className={styles.SignupButton}
              >
                SignUp
              </Button>
            </div>
          </div>
          <div className={styles.ImageContainer}>
            <img
              className={styles.image}
              src="./Image.png"
              alt="illustration"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LandingPage;
