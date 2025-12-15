import { InputGroup, Button, Form, Col, Row } from "react-bootstrap";

export default function LoadsTab({
  loadsChange,
  handleLoadsChange,
  handleAddLoads,
}) {
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text>Quantity</InputGroup.Text>
        <Form.Control
          type="number"
          name="quantity"
          value={loadsChange.quantity}
          onChange={handleLoadsChange}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>Material</InputGroup.Text>
        <Form.Control
          name="material"
          value={loadsChange.material}
          onChange={handleLoadsChange}
        />
      </InputGroup>

      <Form.Group as={Row} className="mb-3">
        <Form.Label as="legend" column sm={2}>
          Source:
        </Form.Label>
        <Col sm={10}>
          <Form.Check inline type="radio" label="Import" name="source" value={"import"} onChange={handleLoadsChange} />
          <Form.Check type="radio" label="Export" name="source" value={"export"} onChange={handleLoadsChange}/>
        </Col>
      </Form.Group>

      <Button id="basicBtn" className="floatRight" onClick={handleAddLoads}>
        Add Loads
      </Button>
    </div>
  );
}
