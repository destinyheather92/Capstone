import { useState } from "react";
import { Button, Form, Modal} from "react-bootstrap";

export default function EditJobsiteModal({
  handleChange,
  jobSiteID,
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
      setValidated(true);
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
          <Modal.Title>{typeOf} Jobsite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {validationNeeded ? (
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                {/* this id is the jobsite id all inputs have access */}
                <Form.Control
                  required
                  data-jobsiteid={jobSiteID}
                  type="text"
                  name="jobsiteName"
                  placeholder="Jobsite Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Lead Foreman</Form.Label>
                <Form.Control
                  required
                  data-jobsiteid={jobSiteID}
                  type="text"
                  name="leadForeman"
                  placeholder="Lead Foreman"
                  autoFocus
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Deadline</Form.Label>
                <Form.Control
                  required
                  data-jobsiteid={jobSiteID}
                  type="date"
                  name="deadline"
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
                  data-jobsiteid={jobSiteID}
                  type="text"
                  name="jobsiteName"
                  placeholder="Jobsite Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Lead Foreman</Form.Label>
                <Form.Control
                  data-jobsiteid={jobSiteID}
                  type="text"
                  name="leadForeman"
                  placeholder="Lead Foreman"
                  autoFocus
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Deadline</Form.Label>
                <Form.Control
                  data-jobsiteid={jobSiteID}
                  type="date"
                  name="deadline"
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
