import React, { useState, useEffect, useRef } from "react";
import { Accordion, InputGroup, Form, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Accordions.css";
export default function Accordions({
  handleGenericSubmit,
  handleEqChange,
  handleGenericChange,
  handleSubmitEqChange,
  handleIncidentChange,
  handleSubmitIncidentChange,
  handleLoadsChange,
  handleSubmitLoads,
  dwr,
  handleGoBack,
  companyID,
  handleDelete,
}) {
  const allIncidents = useRef(dwr.incidents);
  const allEq = useRef(dwr.equipmentUsed);
  const allLoads = useRef(dwr.loads);
  const [equipmentToEdit, setEquipmentToEdit] = useState("");
  //all equipment form the database
  const [equipment, setEquipment] = useState([]);
  const [incidentToEdit, setIncidentToEdit] = useState("");
  const [loadsToEdit, setLoadsToEdit] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/equipment/${companyID}`)
      .then((res) => setEquipment(res.data));
  }, []);
  return (
    <>
      <div>
        <Button
          id="basicBtn"
          className="m-3 deleteDWR"
          onDoubleClick={handleDelete}
        >
          DELETE DWR
        </Button>
        <Accordion variant="dark">
          {/* THE GENERIC INFO IS BASICALLY STUFF THAT CAN BE EDITED WITH JUST THE DWR ID, THERE IS NO DIGGING NECESSARY FOR THIS STUFF */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Generic Info:{" "}
              <span className="accordianBtn">
                <FontAwesomeIcon
                  icon={faAngleDown}
                  style={{ color: "#ff6a00" }}
                />
              </span>
            </Accordion.Header>
            <Accordion.Body>
              <InputGroup className="mb-3">
                <InputGroup.Text>Entered By</InputGroup.Text>
                <Form.Control
                  type="text"
                  name="enteredBy"
                  onChange={handleGenericChange}
                  placeholder={dwr.enteredBy}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text>Workers On Site</InputGroup.Text>
                <Form.Control
                  name="workersOnSite"
                  placeholder={dwr.workersOnSite}
                  onChange={handleGenericChange}
                />
              </InputGroup>
              <Button
                id="basicBtn"
                className="floatRight"
                data-eqid={equipmentToEdit._id}
                onClick={handleGenericSubmit}
              >
                Add Generic Changes
              </Button>
            </Accordion.Body>
          </Accordion.Item>

          {/* maybe for these guys we can have a select box based on that stuff.  */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              Equipment Used{" "}
              <span className="accordianBtn">
                <FontAwesomeIcon
                  icon={faAngleDown}
                  style={{ color: "#ff6a00" }}
                />
              </span>
            </Accordion.Header>

            <Accordion.Body>
              {/* this is allowing users to select equipment to edit then takes them to the edit functionality for that specific equipment. The submit button is handled on the editDWR page and go back just clears the state   */}
              {!equipmentToEdit ? (
                <>
                  <p className="centerText">
                    Select Equipment from the list below.
                  </p>
                  {/*  onChange={(e) => setJobID(e.target.value)} */}
                  {allEq.current.length != 0 ? (
                    <Form.Select
                      onChange={(event) =>
                        setEquipmentToEdit(
                          dwr.equipmentUsed.filter(
                            (e) => e._id === event.target.value
                          )[0]
                        )
                      }
                    >
                      <option>Open to Make Selection</option>
                      {dwr.equipmentUsed.map((e) => (
                        <option value={e._id}>{e.name}</option>
                      ))}
                    </Form.Select>
                  ) : (
                    <p className="error centerText">
                      No Equipment Used for this date.
                    </p>
                  )}
                </>
              ) : (
                <>
                  <h5 className="centerText">{equipmentToEdit.name}</h5>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      Equipment Used
                    </InputGroup.Text>
                    <Form.Select
                      name="name"
                      onChange={(e) => {
                        setEquipmentToEdit({
                          ...equipmentToEdit,
                          [e.target.name]: e.target.value,
                        });
                        handleEqChange(e);
                      }}
                    >
                      <option>Open this select menu</option>
                      {equipment.map((e) => (
                        <option value={e.name}>{e.name}</option>
                      ))}
                    </Form.Select>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>Quantity</InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="quantity"
                      placeholder={equipmentToEdit.quantity}
                      onChange={handleEqChange}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>Hours</InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="hours"
                      placeholder={equipmentToEdit.hours}
                      onChange={handleEqChange}
                    />
                  </InputGroup>
                  <Button
                    id="basicBtn"
                    className="floatRight"
                    data-eqid={equipmentToEdit._id}
                    onClick={handleSubmitEqChange}
                    //this needs a dataset prop with the id of equiopmentToEditId
                  >
                    Add Equipment Changes
                  </Button>
                  <Button
                    id="basicBtn"
                    className="centerBtn primaryBtn"
                    onClick={() => setEquipmentToEdit("")}
                  >
                    Go Back
                  </Button>
                </>
              )}

              {/* {dwr[0].equipmentUsed} */}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              Incidents{" "}
              <span className="accordianBtn">
                <FontAwesomeIcon
                  icon={faAngleDown}
                  style={{ color: "#ff6a00" }}
                />
              </span>
            </Accordion.Header>
            <Accordion.Body>
              {!incidentToEdit ? (
                <>
                  <p className="centerText">
                    Select an Incident from the list below
                  </p>
                  {allIncidents.current.length != 0 ? (
                    <Form.Select
                      onChange={(event) =>
                        setIncidentToEdit(
                          dwr.incidents.filter(
                            (e) => e._id === event.target.value
                          )[0]
                        )
                      }
                    >
                      <option>Open to Select Incident</option>
                      {dwr.incidents.map((e) => (
                        <option value={e._id}>{e.incident}</option>
                      ))}
                    </Form.Select>
                  ) : (
                    <p className="error centerText">
                      No Incidents for this date.
                    </p>
                  )}
                </>
              ) : (
                <>
                  <h5 className="centerText">{incidentToEdit.incident}</h5>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>Incident</InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="incident"
                      placeholder={incidentToEdit.incident}
                      onChange={handleIncidentChange}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>Hours</InputGroup.Text>
                    <Form.Control
                      type="time"
                      name="time"
                      placeholder={incidentToEdit.time}
                      onChange={handleIncidentChange}
                    />
                  </InputGroup>
                  <Button
                    id="basicBtn"
                    className="floatRight"
                    data-incidentid={incidentToEdit._id}
                    onClick={handleSubmitIncidentChange}
                  >
                    Add Incident Changes
                  </Button>
                  <Button
                    id="basicBtn"
                    className="centerBtn primaryBtn"
                    onClick={() => setIncidentToEdit("")}
                  >
                    Go Back
                  </Button>
                </>
              )}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>
              Loads{" "}
              <span className="accordianBtn">
                <FontAwesomeIcon
                  icon={faAngleDown}
                  style={{ color: "#ff6a00" }}
                />
              </span>
            </Accordion.Header>
            <Accordion.Body>
              {!loadsToEdit ? (
                <>
                  <p className="centerText">Select Load from the list below</p>
                  {allLoads.current.length != 0 ? (
                    <Form.Select
                      onChange={(event) =>
                        setLoadsToEdit(
                          dwr.loads.filter(
                            (e) => e._id === event.target.value
                          )[0]
                        )
                      }
                    >
                      <option>Open to Select Load</option>
                      {dwr.loads.map((e) => (
                        <option value={e._id}>
                          {e.source}-{e.material}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    <p className="error centerText">No Loads for this date.</p>
                  )}
                </>
              ) : (
                <>
                  <h5 className="centerText">
                    {loadsToEdit.material}-{loadsToEdit.source.toUpperCase()}
                  </h5>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>Material</InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="material"
                      placeholder={loadsToEdit.material}
                      onChange={handleLoadsChange}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>Quantity</InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="time"
                      placeholder={loadsToEdit.quantity}
                      onChange={handleLoadsChange}
                    />
                  </InputGroup>

                  <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>
                      Source:
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Check
                        inline
                        type="radio"
                        label="Import"
                        name="source"
                        value={"import"}
                        onChange={handleLoadsChange}
                      />
                      <Form.Check
                        type="radio"
                        label="Export"
                        name="source"
                        value={"export"}
                        onChange={handleLoadsChange}
                      />
                    </Col>
                  </Form.Group>
                  <Button
                    id="basicBtn"
                    className="floatRight"
                    data-loadid={loadsToEdit._id}
                    onClick={handleSubmitLoads}
                  >
                    Add Load Changes
                  </Button>
                  <Button
                    id="basicBtn"
                    className="centerBtn primaryBtn"
                    onClick={() => setLoadsToEdit("")}
                  >
                    Go Back
                  </Button>
                </>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Button
          id="basicBtn"
          className="centerBtn primaryBtn mt-3"
          onClick={handleGoBack}
        >
          Select Date
        </Button>
      </div>
    </>
  );
}
