import React, { useContext, Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./HomePage.module.css";
import { OrganiserContext } from "../../Context/Context";
import {
  SELECTED_BOARD_KEY,
  GET_DATA,
  LOADER,
} from "../../Context/ActionTypes";
import { Button } from "reactstrap";
import NavBar from "../../Layout/NavBar/NavBar";
import firebase from "firebase/app";
import Loader from "../../Components/Loader/Loader";

function HomePage(props) {
  const { state, dispatch } = useContext(OrganiserContext);
  const history = useHistory();
  console.log(state.boards);
  const handleClick = (key, value) => {
    dispatch({
      type: SELECTED_BOARD_KEY,
      payload: { key, value },
    });
    history.push(`/board/${key}/${value.nameofBoard}`);
  };
  const openCreateBoard = () => {
    history.replace(`/createBoard`);
  };

  useEffect(() => {
    dispatch({
      type: LOADER,
      payload: true,
    });
    const boardsRef = firebase.database().ref(`/boards`);
    boardsRef.on("value", (snapshot) => {
      dispatch({
        type: GET_DATA,
        payload: snapshot.val(),
      });
      dispatch({
        type: LOADER,
        payload: false,
      });
    });

    console.log("stopped");
  }, [dispatch]);

  if (state.loader === true) {
    return (
      <>
        <NavBar></NavBar>

        <Loader></Loader>
      </>
    );
  }
  return (
    <Fragment>
      <NavBar></NavBar>
      <div className={styles.HomePage}>
        <div className={styles.head}>Boards</div>
        {state.boards !== null && state.loader === false ? (
          <div className={styles.boardsContainer}>
            {Object.entries(state.boards).map(([key, value]) => (
              <div key={key} onClick={() => handleClick(key, value)}>
                <div className={styles.boardCard}>
                  <p className={styles.boardName}>{value.nameofBoard}</p>
                </div>
              </div>
            ))}{" "}
          </div>
        ) : null}
        {state.boards === null && state.loader === false ? (
          <>
            <p>
              You haven't created any boards. Kindly click on the 'Create Board'
              button in the navigation bar to create a board.
            </p>
            <Button className={styles.button} onClick={() => openCreateBoard()}>
              Create Board
            </Button>
          </>
        ) : null}
      </div>
    </Fragment>
  );
}

export default HomePage;
