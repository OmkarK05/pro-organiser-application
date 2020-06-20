import React from "react";
import styles from "./Relogin.module.css";

import NavBar from "../../Layout/NavBar/NavBar";

const Relogin = () => {
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
