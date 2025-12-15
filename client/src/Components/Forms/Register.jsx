import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import states from "states-us";

export default function Register({
  validateBool,
  handleSubmit,
  handleChange,
  val,
  submitBtnName,
  newAcct,
  pwRequired,ref
}) {
  const listOfStates = states.map((e) => e.name);

  return (
    <Form noValidate validated={validateBool} onSubmit={handleSubmit}>
      {/* first row, first name and last name  */}
      <Row className="mb-3 registerRows">
        <Form.Group as={Col} md="6">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="firstName"
            placeholder="First name"
            value={val.firstName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            name="lastName"
            onChange={handleChange}
            value={val.lastName}
          />
        </Form.Group>
      </Row>

      {/* second row email and phone number */}
      <Row className="mb-3 registerRows">
        <Form.Group as={Col} md="6">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={val.email}
          />
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Phone No.</Form.Label>
          <Form.Control
            required
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="Phone No. "
            name="phone"
            onChange={handleChange}
            value={val.phone}
          />
          <Form.Text muted>
            Your phone number must follow the following format: 123-456-7890
          </Form.Text>
        </Form.Group>
      </Row>

      {/* third Row is username and password */}
      <Row className="mb-3 registerRows">
        <Form.Group as={Col} md="6">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={val.username}
              required
              onChange={handleChange}
              ref={ref}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        {/* **********Password ******** */}
        <Form.Group as={Col} md="6">
          <Form.Label>Password</Form.Label>
          {pwRequired ? (
            <Form.Control
              required
              type="password"
              placeholder="Password"
              name="password"
              pattern="((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})"
              onChange={handleChange}
            />
          ) : (
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              pattern="((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})"
              onChange={handleChange}
            />
          )}{" "}
          <Form.Text muted>
            Ensure that password is 8 to 64 characters long and contains a mix
            of upper and lower case characters, one numeric and one special
            character
          </Form.Text>
          {/* <Form.Control
            required
            type="password"
            placeholder="Password"
            name="password"
            pattern="((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})"
            onChange={handleChange}
          />
          <Form.Text muted>
            Ensure that password is 8 to 64 characters long and contains a mix
            of upper and lower case characters, one numeric and one special
            character
          </Form.Text> */}
        </Form.Group>
      </Row>
      {/* Company Name */}
      <Row className="mb-3 registerRows">
        <Form.Group as={Col} md="12">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Company Name"
            name="companyName"
            onChange={handleChange}
            value={val.companyName}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a company name.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3 registerRows">
        <Form.Group as={Col} md="12">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Street Address"
            name="streetAddress"
            onChange={handleChange}
            value={val.streetAddress}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid street address.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3 registerRows">
        <Form.Group as={Col} md="6">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            placeholder="City"
            required
            onChange={handleChange}
            value={val.city}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        {/* state drop down  */}
        <Form.Group as={Col} md="3">
          <Form.Label>State</Form.Label>
          <Form.Select
            aria-label="Default select example"
            placeholder="State"
            name="state"
            value={val.state}
            required
            onChange={handleChange}
          >
            {listOfStates.map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </Form.Select>

          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        {/* zip */}
        <Form.Group as={Col} md="3">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            name="zip"
            type="text"
            placeholder="Zip"
            required
            onChange={handleChange}
            value={val.zip}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      {/* //only displays if it is a newAcct to be registered */}
      {newAcct && (
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
      )}

      <Button id="basicBtn" type="submit">
        {submitBtnName}
      </Button>
    </Form>
  );
}
