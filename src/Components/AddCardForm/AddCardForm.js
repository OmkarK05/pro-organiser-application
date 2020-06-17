import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./AddCardForm.module.css";
import Modal from "react-modal";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { FaTimesCircle } from "react-icons/fa";
import { OrganiserContext } from "../../Context/Context";
import { SET_CARD, EDIT_CARD, VIEW_CARD } from "../../Context/ActionTypes";
import { v4 } from "uuid";
import firebase from "firebase/app";

const AddCardForm = ({ columnKey }) => {
  const [taskTitle, setTaskTitle] = useState();
  const [members, setMembers] = useState([]);
  const [description, setDescription] = useState();
  const [dueDate, setDueDate] = useState();
  const [selectedMembers, setSelectedMembers] = useState([]);

  const { state, dispatch } = useContext(OrganiserContext);
  const { editCard, setCardValue, setCardKey } = state;

  console.log(editCard, state.setUser.uid, state.selectedBoardKey, columnKey);

  const createMembersArray = (members) => {
    let membersString = members;
    let membersArray = membersString.split(",");
    return membersArray;
  };

  const handleChangeMembers = (selectedOptions) => {
    setSelectedMembers([]);
    setSelectedMembers(selectedOptions);
    setMembers([]);
  };

  let newArray;
  const selectedMembersArray = (allTeamMembers) => {
    console.log(members);
    let teamMembers = createMembersArray(allTeamMembers);
    newArray = teamMembers.filter((member) => members.indexOf(member) === -1);
    console.log(newArray);
    for (let i = 0; i < members.length; i++) {
      newArray.unshift(members[i]);
    }

    return newArray;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let i = 0; i < selectedMembers.length; i++) {
      console.log(selectedMembers[i].value);
      console.log(members);
      members.push(selectedMembers[i].value);
    }
    console.log(selectedMembers);

    dispatch({
      type: EDIT_CARD,
      payload: { editCard: false },
    });
    dispatch({
      type: VIEW_CARD,
      payload: { viewCard: false },
    });

    console.log("sdas");
    if (editCard === true) {
      try {
        console.log("database");
        firebase
          .database()
          .ref(
            `/users/${state.setUser.uid}/boards/${state.selectedBoardKey}/columns/${columnKey}/cards/${setCardKey}`
          )
          .set({ members }, (error) => {
            if (error) {
              console.log(error);
            } else {
              resetForm();
              console.log("success");
            }
          });
      } catch (err) {
        console.log(err);
      }
      try {
        firebase
          .database()
          .ref(
            `/users/${state.setUser.uid}/boards/${state.selectedBoardKey}/columns/${columnKey}/cards/${setCardKey}`
          )
          .update({ taskTitle, description, dueDate }, (error) => {
            if (error) {
              console.log(error);
            } else {
              resetForm();
              console.log("success");
            }
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        console.log("database");

        firebase
          .database()
          .ref(
            `/users/${state.setUser.uid}/boards/${
              state.selectedBoardKey
            }/columns/${columnKey}/cards/${v4()}`
          )
          .set({ taskTitle, members, description, dueDate }, (error) => {
            if (error) {
              console.log(error);
            } else {
              resetForm();
              console.log("success");
            }
          });
      } catch (err) {
        console.log(err);
      }
    }

    console.log("editcardFalse");
  };

  useEffect(() => {
    if (editCard === true) {
      console.log("changed");
      setTaskTitle(setCardValue.taskTitle);
      setDescription(setCardValue.description);
      setMembers(setCardValue.members);
      setDueDate(setCardValue.dueDate);
    }
  }, [setCardValue]);

  const resetForm = () => {
    setTaskTitle("");
    setDescription("");
    setDueDate("");
    setMembers("");
  };
  const closeModal = () => {
    resetForm();
    dispatch({
      type: SET_CARD,
      payload: false,
    });
    dispatch({
      type: EDIT_CARD,
      payload: { editCard: false },
    });
    dispatch({
      type: VIEW_CARD,
      payload: { viewCard: false },
    });
  };
  return (
    <Modal
      isOpen={state.setCard || editCard}
      onRequestClose={() => closeModal()}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.close}>
        <FaTimesCircle
          size={30}
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
            id="title"
            value={taskTitle}
            placeholder=""
            onChange={(e) => setTaskTitle(e.target.value)}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label}>
            Choose members for this task(select, multiple if needed)
            <p
              style={{
                fontSize: "12px",
                paddingBottom: "0px",
                marginBottom: "0px",
              }}
            ></p>
          </Label>
          <Input
            type="select"
            name="select"
            id="exampleSelect"
            onChange={(e) => handleChangeMembers(e.target.selectedOptions)}
            multiple
          >
            {editCard === false
              ? createMembersArray(state.selectedBoardValue.teamMembers).map(
                  (value, index) => (
                    <option value={value} key={index}>
                      {value}
                    </option>
                  )
                )
              : selectedMembersArray(state.selectedBoardValue.teamMembers).map(
                  (value, index) => {
                    if (index < members.length) {
                      return (
                        <option value={value} key={index} selected>
                          {value}
                        </option>
                      );
                    } else {
                      return (
                        <option value={value} key={index}>
                          {value}
                        </option>
                      );
                    }
                  }
                )}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label}>Type of Board</Label>
          <Input
            type="text"
            id="description"
            placeholder=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label}>Due Date</Label>
          <Input
            type="date"
            id="due_date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </FormGroup>
        <Button
          size="md"
          id="CreateCard"
          type="submit"
          className={styles.createButton}
        >
          {state.editCard === true ? "Save Changes" : "Create Board"}
        </Button>
      </Form>
    </Modal>
  );
};

export default AddCardForm;
