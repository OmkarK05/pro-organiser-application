import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./ViewCard.module.css";
import Modal from "react-modal";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { FaTimesCircle } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import EditDeleteIcons from "../EditDeleteIcons/EditDeleteIcons";
import { OrganiserContext } from "../../Context/Context";
import { VIEW_CARD } from "../../Context/ActionTypes";
import firebase from "firebase/app";

const ViewCard = ({ columnKey }) => {
  const { state, dispatch } = useContext(OrganiserContext);
  const { setCardValue, viewCard, setCardKey } = state;

  const closeModal = () => {
    dispatch({
      type: VIEW_CARD,
      payload: { viewCard: false },
    });
  };
  return (
    <Modal
      isOpen={viewCard}
      onRequestClose={() => closeModal()}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.close}>
        <EditDeleteIcons
          columnKey={columnKey}
          cardKey={setCardKey}
          cardValue={setCardValue}
        ></EditDeleteIcons>
        <FaTimesCircle
          size={25}
          color="grey"
          onClick={() => closeModal()}
        ></FaTimesCircle>
      </div>
      <div className={styles.headContainer}>
        <p className={styles.head}>Task</p>
        <p className={styles.headDueDate}>
          {" "}
          {setCardValue !== null ? setCardValue.dueDate : null}
        </p>
      </div>
      {setCardValue !== null ? (
        <Form className={styles.form}>
          <FormGroup>
            <Label className={styles.label}>Title for Task</Label>
            <p>{setCardValue.taskTitle}</p>
            <p></p>
          </FormGroup>
          <FormGroup>
            <Label className={styles.label}>Team Members</Label>
            <p>{setCardValue.members}</p>

            <p></p>
          </FormGroup>
          <FormGroup>
            <Label className={styles.label}>Type of Board</Label>
            <p>{setCardValue.description}</p>

            <p></p>
          </FormGroup>
          <FormGroup>
            <Label className={styles.label}>Due Date</Label>
            <p>{setCardValue.dueDate}</p>

            <p></p>
          </FormGroup>
        </Form>
      ) : null}
    </Modal>
  );
};

export default ViewCard;
