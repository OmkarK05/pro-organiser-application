import React, { useState, useContext } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import styles from "./EditDeleteIcons.module.css";
import AddCardForm from "../AddCardForm/AddCardForm";
import { OrganiserContext } from "../../Context/Context";
import { VIEW_CARD, EDIT_CARD } from "../../Context/ActionTypes";
import firebase from "firebase/app";

const EditDeleteIcons = ({ cardKey, columnKey, cardValue }) => {
  const { state, dispatch } = useContext(OrganiserContext);
  const [visible, setVisible] = useState(false);

  const setEditCard = () => {
    setVisible(true);

    dispatch({
      type: EDIT_CARD,
      payload: {
        key: cardKey,
        columnKey,
        value: cardValue,
        editCard: true,
      },
    });
  };

  const deleteCard = () => {
    console.log("click");
    firebase
      .database()
      .ref(
        `/users/${state.setUser.uid}/boards/${state.selectedBoardKey}/columns/${columnKey}/cards/${cardKey}`
      )
      .remove();

    dispatch({
      type: VIEW_CARD,
      payload: {
        viewCard: false,
      },
    });
  };
  return (
    <>
      <span className={styles.icons} key={cardKey}>
        <span className={styles.icon}>
          <MdEdit size={20} onClick={() => setEditCard()}></MdEdit>
        </span>
        <span className={styles.icon}>
          <MdDelete size={20} onClick={() => deleteCard()}></MdDelete>
        </span>
      </span>
      {visible === true ? (
        <AddCardForm columnKey={columnKey}></AddCardForm>
      ) : null}
    </>
  );
};

export default EditDeleteIcons;
