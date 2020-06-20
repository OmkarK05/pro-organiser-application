import React, { Fragment, useContext } from "react";
import styles from "./SignUp.module.css";
import { Form, FormGroup, Button, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import { OrganiserContext } from "../../Context/Context";
import { USER_AUTH, USER_AUTH_ERROR } from "../../Context/ActionTypes";
import NavBar from "../../Layout/NavBar/NavBar";
import { useFormik } from "formik";
import * as yup from "yup";

const SignUp = () => {
  const { state, dispatch } = useContext(OrganiserContext);

  const initialValues = {
    email: "",
    name: "",
    password: "",
    reEnterPassword: "",
  };

  const onSubmit = (values) => {
    handleSubmit(values);
  };

  // const validate = (values) => {
  //   //Values.name values.name etc
  //   //errors.name errors.email errors.password
  //   //errors.name = "This field is required"
  //   let errors = {};

  //   if (!values.name) {
  //     errors.name = "required";
  //   }

  //   if (!values.email) {
  //     errors.email = "required";
  //   } else if (
  //     !/^[A-Z0-9._%+-]+@[A-Z0-9>-]+\.[A-Z]{2,4}$/i.test(values.email)
  //   ) {
  //     errors.email = "Invalid email format";
  //   }

  //   if (!values.password) {
  //     errors.password = "required";
  //   } else if (!(values.password.length > 6)) {
  //     errors.password = "Weak Password!! Min length should be 6";
  //   }

  //   if (!values.reEnterPassword) {
  //     errors.reEnterPassword = "required";
  //   } else if (!(values.password === values.reEnterPassword)) {
  //     errors.reEnterPassword = "Password dont match!";
  //   }

  //   return errors;
  // };

  const validationSchema = yup.object({
    name: yup.string().required("required"),
    email: yup.string().email("Invalid email format").required("required"),
    password: yup.string().required("required"),
    reEnterPassword: yup.string().required("required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate,
    validationSchema,
  });
  console.log("Visited Fields", formik.touched);

  const handleSubmit = ({ email, password, name }) => {
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
            userName: name,
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
              <p style={{ color: "red", textAlign: "center" }}>{state.error}</p>
            ) : null}
            <Form onSubmit={formik.handleSubmit} className={styles.formGroup}>
              <FormGroup className={styles.Emailform}>
                <Label for="email" className="mr-sm-2">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  style={{ backgroundColor: "#d1d1d1" }}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </FormGroup>
              <FormGroup className={styles.Usernameform}>
                <Label for="name" className="mr-sm-2">
                  Username
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  style={{ backgroundColor: "#d1d1d1" }}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </FormGroup>
              <FormGroup className={styles.PasswordForm}>
                <Label for="password" className="mr-sm-2">
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  style={{ backgroundColor: "#d1d1d1" }}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </FormGroup>
              <FormGroup className={styles.RewritePasswordForm}>
                <Label for="reEnterPassword" className="mr-sm-2">
                  Re-enter Password
                </Label>
                <Input
                  type="password"
                  name="reEnterPassword"
                  id="reEnterPassword"
                  style={{ backgroundColor: "#d1d1d1" }}
                  onChange={formik.handleChange}
                  value={formik.values.reEnterPassword}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.reEnterPassword &&
                formik.touched.reEnterPassword ? (
                  <div>{formik.errors.reEnterPassword}</div>
                ) : null}
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
