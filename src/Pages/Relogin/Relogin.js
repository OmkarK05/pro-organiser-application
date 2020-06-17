import React from "react";
import styles from "./Relogin.module.css";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import NavBar from "../../Layout/NavBar/NavBar";

const Relogin = () => {
  const history = useHistory();
  const Relogin = () => {
    history.replace("/");
  };
  return (
    <>
      <NavBar></NavBar>
      <div className={styles.container}>
        <p className={styles.button}>
          oops!! session expired please Login again{" "}
        </p>
      </div>
    </>
  );
};

export default Relogin;
