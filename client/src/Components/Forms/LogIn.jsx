import React, { useState, useContext } from "react";
import Header from "../Header/Header";
import { Form, Col, Button, Row } from "react-bootstrap";
import ConstructionAppContext from "../../Context/ConstructionAppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function LogIn() {
  const {user,setUser}= useContext(ConstructionAppContext)
  const [logInUser, setLoginUser] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const [validated, setValidated] = useState(false);
  const navigate= useNavigate()

// when the user types in log in info this is the function to gather that data
  const handleChange = (e) => {
    setLoginUser({ ...logInUser, [e.target.name]: e.target.value });
  };

// function to handle when user clicks the submit button 
//validation is handled here, if its not valid it will instruct the user to fill out necessary field otherwise, it will handle the log in, if there is an error with the credentials, it will let the user know they have "Incorrect Credentials" and to try again. 
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      handleLogin(event);
    }
    setValidated(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/user/login", logInUser, { withCredentials: true })
      .then((res) => {
        //we dont want sensitive info here
        const {firstName,lastName, username, companyName, companyID, role} = res.data.user
        const setContextObj = {firstName,lastName, username, companyName, companyID, role}
        setUser(setContextObj);
        // if login is successful it will take the user back to their page
        navigate("/jobsites")
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  };
  return (
    <div className="p-5">
      <Header title={"Log In"} />
      {error ? (
        <p className="error">Incorrect Credentials, Please Try Again</p>
      ) : null}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3 ">
          <Form.Group as={Col} md="12">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="12">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Button id="basicBtn" type="submit">
          Log In 
        </Button>
      </Form>
    </div>
  );
}
