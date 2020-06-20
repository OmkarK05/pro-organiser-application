import React, { useState, useContext } from "react";
import { Card, CardTitle, Button } from "reactstrap";
import styles from "./BoardCards.module.css";
import ViewCard from "../ViewCard/ViewCard";
import AddCardForm from "../AddCardForm/AddCardForm";
import { OrganiserContext } from "../../Context/Context";
import {
  VIEW_CARD,
  SET_CARD,
  EDIT_CARD,
  DRAG_DROP,
} from "../../Context/ActionTypes";
import { MdViewList, MdEdit, MdDelete } from "react-icons/md";
import firebase from "firebase/app";
import { toast } from "react-toastify";

const BoardCards = ({ cards, columnKey }) => {
  const { state, dispatch } = useContext(OrganiserContext);
  const [visible, setVisible] = useState(false);

  const splitNames = (member) => {
    let split = member.split(":");
    return split[0];
  };

  const viewCardClick = (key, value) => {
    console.log(key);

    dispatch({
      type: VIEW_CARD,
      payload: {
        key,
        value,
        viewCard: true,
      },
    });
  };

  const setEditCard = (key, value) => {
    setVisible(true);

    dispatch({
      type: EDIT_CARD,
      payload: {
        key,
        value,
        editCard: true,
      },
    });
  };

  const addCardClick = () => {
    setVisible(true);

    dispatch({
      type: SET_CARD,
      payload: { addCard: true, columnKey },
    });
  };
  const deleteCard = (key) => {
    console.log("click");
    toast("deleted Successfully", { type: "success" });
    firebase
      .database()
      .ref(
        `/users/${state.setUser.uid}/boards/${state.selectedBoardKey}/columns/${columnKey}/cards/${key}`
      )
      .remove();
  };
  const onDragStart = (e, cardKey, cardValue) => {
    console.log(e, cardKey, cardValue);
    e.dataTransfer.setData("text/plain", cardKey);
    dispatch({
      type: DRAG_DROP,
      payload: { columnKey: columnKey, draggesCardData: cardValue },
    });
  };
  return (
    <div key={columnKey}>
      <div>
        <div className={styles.container}>
          {cards !== undefined
            ? Object.entries(cards).map(([key, value]) => (
                <Card
                  className={styles.card}
                  key={key}
                  value={value}
                  id={key}
                  draggable
                  onDragStart={(e) => onDragStart(e, key, value)}
                >
                  <div className={styles.header}>
                    <div>
                      <CardTitle className={styles.title}>
                        {value.taskTitle}
                      </CardTitle>
                    </div>
                    <div className={styles.empty}></div>
                    <div
                      style={{ marginLeft: "6px", color: "rgb(70, 69, 69)" }}
                    >
                      <MdDelete
                        className={styles.icon}
                        onClick={() => deleteCard(key)}
                        size={20}
                      ></MdDelete>
                    </div>
                  </div>
                  <div className={styles.footer}>
                    <span className={styles.icons}>
                      <span className={styles.icon}>
                        <MdEdit
                          onClick={() => setEditCard(key, value)}
                          size={20}
                        ></MdEdit>
                      </span>
                      <span className={styles.icon}>
                        <MdViewList
                          onClick={() => viewCardClick(key, value)}
                          size={25}
                        ></MdViewList>
                      </span>
                    </span>
                    {value.members
                      ? value.members.map((member) => (
                          <span className={styles.circle}>
                            <span className={styles.name}>
                              {splitNames(member)}
                            </span>
                          </span>
                        ))
                      : null}
                  </div>
                </Card>
              ))
            : null}
        </div>
        <Button className={styles.button} onClick={() => addCardClick()}>
          Add Card
        </Button>
      </div>
      {state.viewCard === true ? (
        <ViewCard columnKey={columnKey}></ViewCard>
      ) : null}
      {visible && <AddCardForm columnKey={columnKey}></AddCardForm>}
    </div>
  );
};

export default BoardCards;
