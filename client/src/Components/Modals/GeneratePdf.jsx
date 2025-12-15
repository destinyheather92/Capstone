import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';

export default function GeneratePdf({handleClick, handleNotes}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        id="basicBtn"
        className="centerBtn primaryBtn"
        onClick={handleShow}
      >
        Generate PDF
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="bg-light "
        data-bs-theme="dark"
      >
        <Modal.Header closeButton>
          <Modal.Title>Optional  Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body  bg="dark" >
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter notes for PDF (optional)</Form.Label>
              <Form.Control onChange={handleNotes}as="textarea" rows={3} />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button id="basicBtn" variant="secondary" onClick={handleClick}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
