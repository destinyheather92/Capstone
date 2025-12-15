import React, { useState, useContext, useEffect, useRef } from "react";
import Header from "../../../Components/Header/Header";
// import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Register from "../../../Components/Forms/Register";
import axios from "axios";
import ConstructionAppContext from "../../../Context/ConstructionAppContext";
export default function EditProfile() {
  const usernameRef = useRef(null);
  const { user, setUser } = useContext(ConstructionAppContext);
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
  const [changes, setChanges] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/getCompany/${user.companyID}`)
      .then((res) => setAccount(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      submitChanges(event);
    }
    setValidated(true);
  };

  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
    //keeping up with things that have been changed
    setChanges({ ...changes, [e.target.name]: e.target.value });
  };

  const submitChanges = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:8080/api/user/editProfile/${account.companyID}/${user._id}`,
        changes
      )
      .then((res) => {
        setAccount(res.data);
      })
      .catch((err) => {
        usernameRef.current.setCustomValidity("Username already exists");
        usernameRef.current.reportValidity();
      });
  };

  return (
    <div className="p-5 m-3">
      <Header title={"Edit  Profile"} />
      <Register
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        validateBool={validated}
        val={account}
        newAcct={false}
        submitBtnName={"Submit Changes "}
        pwRequired={false}
        ref={usernameRef}
      />
    </div>
  );
}

//if i want an eventual delete button to delete th company: a server route will also have to be created for this where it also deletes all the users associated with that company.
//  const renderTooltip = (props) => (
//   <Tooltip id="button-tooltip" {...props}>
//     Double Click To Delete. This Operation CANNOT BE UNDONE.
//   </Tooltip>
// );

//in the return "
//       <OverlayTrigger
//   placement="top"
//   delay={{ show: 250, hide: 400 }}
//   overlay={renderTooltip}
// >
//   <Button variant="danger" id="deleteCoBtn" onDoubleClick={handleDelete}>
//     Delete Company
//   </Button>
// </OverlayTrigger>
// "
