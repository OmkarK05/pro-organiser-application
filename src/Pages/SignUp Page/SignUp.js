import React, { Fragment, useReducer, useContext, useState } from "react";
import styles from "./SignUp.module.css";
import { Form, FormGroup, Button, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import firebase, { auth } from "firebase/app";
import { OrganiserContext } from "../../Context/Context";
import { USER_AUTH, USER_AUTH_ERROR } from "../../Context/ActionTypes";
import NavBar from "../../Layout/NavBar/NavBar";

const SignUp = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [email, setEmail] = useState();
  // const [showpassword, setShowpassword] = useState(false);

  const { state, dispatch } = useContext(OrganiserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        dispatch({
          type: USER_AUTH,
          payload: {
            email: res.user.email,
            uid: res.user.uid,
            userName: username,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: USER_AUTH_ERROR,
          payload: err.message,
        });
      });
  };

  return (
    <Fragment>
      <NavBar></NavBar>
      <div className={styles.container}>
        <div className={styles.signupPage}>
          <div className={styles.formContainer}>
            <div className={styles.headContainer}>
              <p className={styles.text}> Sign In </p>
              <p className={styles.already}>
                Already a member <Link>Log In</Link>
              </p>
            </div>
            {state.error ? (
              <p style={{ color: "red", textAlign: "center" }}>
                {state.error.slice(0, 30)}
              </p>
            ) : null}
            <Form
              onSubmit={(e) => handleSubmit(e)}
              className={styles.formGroup}
            >
              <FormGroup className={styles.Emailform}>
                <Label for="exampleEmail" className="mr-sm-2">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  style={{ backgroundColor: "#d1d1d1" }}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="something@idk.cool"
                />
              </FormGroup>
              <FormGroup className={styles.Usernameform}>
                <Label for="exampleEmail" className="mr-sm-2">
                  Username
                </Label>
                <Input
                  type="type"
                  name="type"
                  id="exampleEmail"
                  placeholder="something@idk.cool"
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ backgroundColor: "#d1d1d1" }}
                />
              </FormGroup>
              <FormGroup className={styles.PasswordForm}>
                <Label for="examplePassword" className="mr-sm-2">
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="don't tell!"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ backgroundColor: "#d1d1d1" }}
                />
              </FormGroup>
              <FormGroup className={styles.RewritePasswordForm}>
                <Label for="examplePassword" className="mr-sm-2">
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="don't tell!"
                  style={{ backgroundColor: "#d1d1d1" }}
                  onChange={(e) => setRePassword(e.target.value)}
                />
              </FormGroup>
              <Button type="submit" className={styles.button}>
                Sign In
              </Button>
            </Form>
          </div>
          <div className={styles.ImageContainer}>
            <img
              className={styles.image}
              src="./Image.png"
              alt="illustration"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
