import React from "react";
import { InputGroup, Form, Button } from "react-bootstrap";

export default function IncidentsTab({
  incidentChange,
  handleIncidentChange,
  handleAddIncident,
}) {
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text>Time</InputGroup.Text>
        <Form.Control
          type="time"
          name="time"
          value={incidentChange.time}
          onChange={handleIncidentChange}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>Incident</InputGroup.Text>
        <Form.Control
          as="textarea"
          name="incident"
          value={incidentChange.incident}
          onChange={handleIncidentChange}
        />
      </InputGroup>
      <Button id="basicBtn" className="floatRight" onClick={handleAddIncident}>
        Add Incident
      </Button>
    </div>
  );
}
