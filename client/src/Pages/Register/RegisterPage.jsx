import React from "react";
import axios from "axios";
import { useState } from "react";
import Header from "../../Components/Header/Header";
import Register from "../../Components/Forms/Register";
import { useNavigate } from "react-router-dom";
export default function RegisterPage() {
  const [validated, setValidated] = useState(false);
  const [account, setAccount] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    companyName: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      handleRegister(event);
    }
    setValidated(true);
  };
  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
    // console.log(account);
  };

  const handleRegister = (e) => {
    //took this off so it resets for me
    // e.preventDefault()
    axios
      .post(`http://localhost:8080/api/user/registerCompany`, account)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
    navigate("/login");
  };

  return (
    <div id="registerForm" className="p-5 m-3">
      <Header title={"REGISTER:"} />
      <Register
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        validateBool={validated}
        val={account}
        newAcct={true}
        submitBtnName={"Submit Form "}
        pwRequired={true}
      />
    </div>
  );
}
