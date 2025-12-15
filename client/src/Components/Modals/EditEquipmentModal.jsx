import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function EditEquipmentModal({
  handleChange,
  eqID,
  typeOf,
  handleSave,
  validationNeeded,
}) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const handleClose = () => {
    setValidated(false);
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setValidated(true);
      handleSave();
      handleClose();
    }
    
  };
  return (
    <>
      <Button
        id="basicBtn"
        className="centerBtn primaryBtn"
        onClick={handleShow}
      >
        {typeOf}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{typeOf} Equipment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {validationNeeded ? (
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                {/* this id is the equipments id, that way  all inputs have access */}
                <Form.Control
                  required
                  data-eqid={eqID}
                  type="text"
                  name="name"
                  placeholder="Equipment Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  required
                  data-eqid={eqID}
                  type="text"
                  name="type"
                  placeholder="Equipment Type"
                  autoFocus
                  onChange={handleChange}
                />
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button id="basicBtn" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  data-eqid={eqID}
                  type="text"
                  name="name"
                  placeholder="Equipment Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  data-eqid={eqID}
                  type="text"
                  name="type"
                  placeholder="Equipment Type"
                  autoFocus
                  onChange={handleChange}
                />
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  id="basicBtn"
                  onClick={() => {
                    handleSave();
                    handleClose();
                  }}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
