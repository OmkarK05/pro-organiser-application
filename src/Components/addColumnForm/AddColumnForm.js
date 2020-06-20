import React, { useState, useContext } from "react";
import styles from "./AddColumnForm.module.css";
import Modal from "react-modal";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { FaTimesCircle } from "react-icons/fa";
import { OrganiserContext } from "../../Context/Context";
import { SET_COLUMN } from "../../Context/ActionTypes";
import firebase from "firebase/app";
import { v4 } from "uuid";

const AddColumnForm = () => {
  const [taskTitle, setTaskTitle] = useState();

  const { state, dispatch } = useContext(OrganiserContext);

  const closeModal = () => {
    dispatch({
      type: SET_COLUMN,
      payload: false,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase
      .database()
      .ref(
        `/users/${state.setUser.uid}/boards/${
          state.selectedBoardKey
        }/columns/${v4()}/`
      )
      .set({ taskTitle }, function (error) {
        if (error) {
          console.log(error);
        } else {
          reset();
        }
      });
  };

  const reset = () => {
    setTaskTitle(" ");
  };
  return (
    <Modal
      isOpen={state.setColumn}
      onRequestClose={() => closeModal()}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <div className={styles.close}>
        <FaTimesCircle
          size={25}
          color="grey"
          onClick={() => closeModal()}
        ></FaTimesCircle>
      </div>

      <p className={styles.head}> Add Task</p>
      <Form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <FormGroup>
          <Label className={styles.label}>Title for Task</Label>
          <Input
            type="text"
            id="column_name"
            value={taskTitle}
            placeholder=""
            onChange={(e) => setTaskTitle(e.target.value)}
          ></Input>
        </FormGroup>
        <Button
          type="submit"
          id="CreateColumn"
          onChange={(e) => setTaskTitle(e.target.value)}
          size="md"
          className={styles.createButton}
        >
          Add Task
        </Button>
      </Form>
    </Modal>
  );
};

export default AddColumnForm;
