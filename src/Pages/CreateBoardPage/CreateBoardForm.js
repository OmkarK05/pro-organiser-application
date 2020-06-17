import React, {
  useState,
  useRef,
  useEffect,
  Fragment,
  useContext,
} from "react";
import { Form, FormGroup, FormText, Label, Input, Button } from "reactstrap";
import { v4 } from "uuid";
import styles from "./CreateBoardForm.module.css";
import firebase from "firebase/app";
import NavBar from "../../Layout/NavBar/NavBar";
import { OrganiserContext } from "../../Context/Context";
import Relogin from "../Relogin/Relogin";
import { toast } from "react-toastify";

const CreateBoardForm = () => {
  const [nameofBoard, setNameofBoard] = useState();
  const [teamMembers, setTeamMembers] = useState([]);
  const [typeOfBoard, setTypeOfBoard] = useState();

  const { state } = useContext(OrganiserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData();
    toast("Board Created", { type: "success" });
  };

  const reset = () => {
    setNameofBoard(" ");
    setTeamMembers(" ");
    setTypeOfBoard(" ");
  };
  const setData = async () => {
    await firebase
      .database()
      .ref(`/users/${state.setUser.uid}/boards/${v4()}/`)
      .set({ nameofBoard, teamMembers, typeOfBoard }, function (error) {
        if (error) {
          console.log(error);
        } else {
          reset();
          return "success";
        }
      });
  };

  if (state.setUser) {
    return (
      <Fragment>
        <NavBar></NavBar>
        <div>
          <p className={styles.head}> Create Your Board</p>
          <Form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <Label className={styles.label}>Name of Board</Label>
              <Input
                type="text"
                id="name"
                value={nameofBoard}
                placeholder=""
                onChange={(e) => setNameofBoard(e.target.value)}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label className={styles.label}>
                Team Members{" "}
                <p
                  style={{
                    fontSize: "12px",
                    paddingBottom: "0px",
                    marginBottom: "0px",
                  }}
                >
                  (Add multiple if needed. e.g: "NN : Nikhil Nair , BS: Bhushan
                  Shewale")
                </p>
              </Label>
              <Input
                type="text-area"
                id="team"
                id="NameofBoard"
                value={teamMembers}
                placeholder="NN : Nikhil Nair"
                onChange={(e) => setTeamMembers(e.target.value)}
                className={styles.members}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label className={styles.label}>Type of Board</Label>
              <Input
                type="text"
                id="type"
                value={typeOfBoard}
                placeholder="e.g. Design board, Testing board, etc."
                onChange={(e) => setTypeOfBoard(e.target.value)}
              ></Input>
            </FormGroup>
            <Button
              size="md"
              id="CreateBoard"
              type="submit"
              className={styles.createButton}
            >
              Create Board
            </Button>
          </Form>
        </div>
      </Fragment>
    );
  } else {
    return <Relogin></Relogin>;
  }
};

export default CreateBoardForm;
