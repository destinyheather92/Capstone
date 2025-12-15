import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

export default function EquipmentUsedTab({
  handleEqChange,
  equipment,
  eqChange,
  handleAddEquip,
}) {
  return (
    <div>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Equipment Used</InputGroup.Text>
        <Form.Select name="name" onChange={handleEqChange}>
          <option value="">Open this select menu</option>
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
          value={eqChange.quantity}
          onChange={handleEqChange}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>Hours</InputGroup.Text>
        <Form.Control
          type="number"
          name="hours"
          value={eqChange.hours}
          onChange={handleEqChange}
        />
      </InputGroup>
      {/* this takes the button away if there is no equipment left in the array to handle for.  */}
      {equipment.length != 0 && (
        <Button id="basicBtn" className="floatRight" onClick={handleAddEquip}>
          Add Equipment
        </Button>
      )}
    </div>
  );
}
