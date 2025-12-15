import { NavLink, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./Navbar.css";
import axios from "axios";
import { useContext, useEffect } from "react";
import ConstructionAppContext from "../../Context/ConstructionAppContext";

export default function NavBar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(ConstructionAppContext);
  // maybe a use effect here will allow me to make a call to see if a user is logged in?
  //handles on the mount. Checks to see if a user is logged in, if they are, sets the user
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user/auth/check", {
        withCredentials: true, // Include cookies with the request, important for sending the JWT stored in cookies
      })
      .then((res) => {
        //if the user is authenticated and logged on, set the user in the context provider. This is beneficial for when the page is refreshed. The token expires in an hour so if it is longer than that, obviously they will no longer be authenticated.
        if (res.data.status === 200) {
          setUser(res.data.user);
        }
      });
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8080/api/user/logout", { withCredentials: true })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.error(err));
    setUser({ username: "", firstName: "", lastName: "" });
  };
  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand ><NavLink to="/">Construction Tracker</NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/jobsites">
              Jobsites
            </NavLink>
            <NavLink className="nav-link" to="/equipment">
              Equipment
            </NavLink>
            {/* Eventually this will need to be a conditional render to handle for Admin Roles only.  */}
         
            {user.role=="admin" &&   <NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <NavLink to="/editJobsites">Edit Jobsites</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/editEquipment">Edit Equipment</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/editDWRS">Edit DWR's</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/editProfile">Edit Profile</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/editEmployees">Edit Employees</NavLink>
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              {/* <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item> */}
            </NavDropdown>}
          
          </Nav>
        </Navbar.Collapse>
        {/* this is the signed in container, important for the use effect, this conditionally renders based on whether the user is logged in or not.  */}
        <Navbar.Collapse className="justify-content-end signedInContainer">
          {user.username != "" ? (
            <>
              <Navbar.Text className="signedInText">{`Signed in as :  ${user.firstName} ${user.lastName}`}</Navbar.Text>{" "}
              <NavLink onClick={handleLogout} className="nav-link" to="/logIn">
                Log Out
              </NavLink>
            </>
          ) : (
            <NavLink className="nav-link" to="/logIn">
              Log In
            </NavLink>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
