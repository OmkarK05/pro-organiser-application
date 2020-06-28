import React, { useContext } from "react";
import { Card, CardTitle } from "reactstrap";
import styles from "./Columns.module.css";
import BoardCards from "../BoardCard./BoardCards";
import { MdDelete } from "react-icons/md";
import { OrganiserContext } from "../../Context/Context";

import firebase from "firebase/app";

const Columns = ({ columnKey, value }) => {
  const { state } = useContext(OrganiserContext);
  const { dragggedColumnKey, draggesCardData, selectedBoardKey } = state;

  const deleteColumn = () => {
    firebase
      .database()
      .ref(`/boards/${selectedBoardKey}/columns/${columnKey}`)
      .remove();
  };

  const onDragOver = (e) => {
    e.preventDefault();
    console.log("Dragged over column");
  };

  const onDrop = (e, columnKey) => {
    console.log(" Dropover column");

    let id = e.dataTransfer.getData("text");

    if (state.draggesCardData !== undefined) {
      console.log("success");
      firebase
        .database()
        .ref(
          `/boards/${state.selectedBoardKey}/columns/${dragggedColumnKey}/cards/${id}`
        )
        .remove();

      firebase
        .database()
        .ref(
          `/boards/${state.selectedBoardKey}/columns/${columnKey}/cards/${id}`
        )
        .set(draggesCardData);
    }
  };

  return (
    <div key={columnKey} className={styles.container}>
      <Card
        key={columnKey}
        className={styles.Card}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, columnKey)}
      >
        <CardTitle className={styles.cardTitle}>
          {value.taskTitle}
          <span style={{ float: "right" }}>
            <MdDelete onClick={() => deleteColumn()} size={20}></MdDelete>
          </span>
        </CardTitle>
        <BoardCards cards={value.cards} columnKey={columnKey}></BoardCards>
      </Card>
    </div>
  );
};

export default Columns;
