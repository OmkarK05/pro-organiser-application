import React, { Fragment, useState, useContext } from "react";
import styles from "./Login.module.css";
import { Form, FormGroup, Button, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import { OrganiserContext } from "../../Context/Context";
import { USER_AUTH, USER_AUTH_ERROR, LOADER } from "../../Context/ActionTypes";
import NavBar from "../../Layout/NavBar/NavBar";
import Loader from "../../Components/Loader/Loader";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showpassword, setShowpassword] = useState(false);

  const { state, dispatch } = useContext(OrganiserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    dispatch({
      type: LOADER,
      payload: true,
    });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res.user.uid);
        dispatch({
          type: USER_AUTH,
          payload: {
            email: res.user.email,
            uid: res.user.uid,
          },
        });
        dispatch({
          type: LOADER,
          payload: false,
        });
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: USER_AUTH_ERROR,
          payload: err.message,
        });
        dispatch({
          type: LOADER,
          payload: false,
        });
      });
  };

  return (
    <Fragment>
      <NavBar></NavBar>
      {state.loader === true ? (
        <div className={styles.loaderContainer}>
          <Loader></Loader>
        </div>
      ) : null}
      <div className={styles.container}>
        <div className={styles.signupPage}>
          <div className={styles.formContainer}>
            <div>
              <p className={styles.text}> Log In </p>
              <p className={styles.already}>
                Not a member <Link>Sign In</Link>
              </p>
            </div>
            {state.error ? (
              <p style={{ color: "red", textAlign: "center" }}>{state.error}</p>
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
                  placeholder="something@idk.cool"
                  style={{ backgroundColor: "#d1d1d1" }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup className={styles.RewritePasswordForm}>
                <Label for="examplePassword" className="mr-sm-2">
                  Password
                </Label>
                <Input
                  type={showpassword === true ? "text" : "password"}
                  name="password"
                  id="examplePassword"
                  placeholder=""
                  // invalid={state.error !== null ? "true" : "false"}
                  style={{ backgroundColor: "#d1d1d1" }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    onClick={() => setShowpassword(!showpassword)}
                  />
                  Show Password
                </Label>
              </FormGroup>
              <Button type="submit" className={styles.button}>
                Log In
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

export default Login;
