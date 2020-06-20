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
import Relogin from "../Relogin/Relogin";
import Loader from "../../Components/Loader/Loader";

function HomePage(props) {
  const { state, dispatch } = useContext(OrganiserContext);
  console.log(props);
  console.log(props.match.params);
  const history = useHistory();
  console.log(state.boards);
  const handleClick = (key, value) => {
    dispatch({
      type: SELECTED_BOARD_KEY,
      payload: { key, value },
    });
    history.push(
      `/${props.match.params.email}/boards/board/${key}/${value.nameofBoard}`
    );
  };
  const openCreateBoard = () => {
    history.replace(`/${props.match.params.email}/createBoard`);
  };

  const getData = async () => {
    dispatch({
      type: LOADER,
      payload: true,
    });
    console.log(state.setUser.uid);
    const boardsRef = await firebase
      .database()
      .ref(`/users/${state.setUser.uid}/boards`);
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
  };

  useEffect(() => {
    getData();
  });

  if (state.loader === true) {
    return (
      <>
        <NavBar></NavBar>

        <Loader></Loader>
      </>
    );
  }
  if (state.setUser) {
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
                You haven't created any boards. Kindly click on the 'Create
                Board' button in the navigation bar to create a board.
              </p>
              <Button
                className={styles.button}
                onClick={() => openCreateBoard()}
              >
                Create Board
              </Button>
            </>
          ) : null}
        </div>
      </Fragment>
    );
  } else {
    return <Relogin></Relogin>;
  }
}

export default HomePage;
