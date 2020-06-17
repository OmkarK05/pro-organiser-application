import React, { useState, useContext, useEffect, Fragment } from "react";
import { Col, Card, CardTitle, CardText, Row, Button, Modal } from "reactstrap";
import styles from "./Board.module.css";
import BoardCards from "../BoardCard./BoardCards";
import AddCardForm from "../AddCardForm/AddCardForm";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import AddColumnForm from "../addColumnForm/AddColumnForm";
import { OrganiserContext } from "../../Context/Context";
import {
  SET_COLUMN,
  SELECTED_BOARD_VALUES,
  GET_BOARD_COLUMN_DATA,
} from "../../Context/ActionTypes";
import firebase from "firebase/app";
import Columns from "../Columns/Columns";
import NavBar from "../../Layout/NavBar/NavBar";
import { useHistory } from "react-router-dom";
import Relogin from "../../Pages/Relogin/Relogin";

const Board = () => {
  const { state, dispatch } = useContext(OrganiserContext);
  const { selectedBoardValue } = state;

  const history = useHistory();

  const setModal = () => {
    dispatch({
      type: SET_COLUMN,
      payload: true,
    });
  };

  const getBoardData = async () => {
    await firebase
      .database()
      .ref(
        `/users/${state.setUser.uid}/boards/${state.selectedBoardKey}/columns/`
      )
      .on("value", (snapshot) => {
        dispatch({
          type: GET_BOARD_COLUMN_DATA,
          payload: snapshot.val(),
        });
      });
  };
  useEffect(() => {
    getBoardData();
  }, []);

  const deleteHandler = () => {
    console.log("click");
    firebase
      .database()
      .ref(`/users/${state.setUser.uid}/boards/${state.selectedBoardKey}/`)
      .remove()
      .then(() => {
        console.log("deleted");
        history.replace("/boards");
      });
  };

  console.log(state.boardColumnsData);
  if (state.setUser) {
    return (
      <Fragment className={styles.container}>
        <NavBar className={styles.NavBar}></NavBar>

        <div className={styles.board}>
          {state.selectedBoardValue !== null ? (
            <>
              <div className={styles.boardHead}>
                <p className={styles.boardName}>
                  {state.selectedBoardValue.nameofBoard}
                </p>
                <Button
                  onClick={() => deleteHandler()}
                  color="danger"
                  className={styles.Button}
                >
                  Delele Board
                </Button>
              </div>

              <div className={styles.container}>
                <div className={styles.columnContainer}>
                  {state.boardColumnsData !== null
                    ? Object.entries(
                        state.boardColumnsData
                      ).map(([key, value]) => (
                        <Columns
                          key={key}
                          columnKey={key}
                          value={value}
                        ></Columns>
                      ))
                    : null}
                </div>

                <div>
                  <Card
                    className={styles.Card}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100px",
                    }}
                    onClick={() => setModal()}
                  >
                    <CardTitle
                      className={styles.AddcardTitle}
                      style={{ textAlign: "center" }}
                    >
                      Add New Column
                    </CardTitle>
                    <div className={styles.icon}>
                      <AiOutlinePlusCircle size={30} color="grey" />
                    </div>
                  </Card>
                </div>
              </div>
              <AddColumnForm></AddColumnForm>
            </>
          ) : null}
        </div>
      </Fragment>
    );
  } else {
    return <Relogin></Relogin>;
  }
};

export default Board;
