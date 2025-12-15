import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Header from "../../Header/Header";
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import "../Contact/Contact.css";

export default function Contact() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    if (form.checkValidity() == true) {
      //left here trying to use this to get it to send an email
      //   let firstName = event.target.elements.firstName.value;
      //   let lastName = event.target.elements.lastName.value;
      //   let email = event.target.elements.email.value;
      //   let subject = event.target.elements.subject.value;
      //   let message = event.target.elements.message.value;
      //   const recipients = [new Recipient(email, `${firstName} ${lastName}`)];
      //   const mailerSend = new MailerSend({});
      //   const sentFrom = new Sender("dhm0292@gmail.com", "Destiny Mills");
      //   const emailParams = new EmailParams()
      //     .setFrom(sentFrom)
      //     .setTo(recipients)
      //     .setReplyTo(sentFrom)
      //     .setSubject(subject)
      //     .setHtml("<strong>This is the HTML content</strong>")
      //     .setText(message);
      //  await mailerSend.email.send(emailParams);
    }
    setValidated(true);
  };

  return (
    <div className="accent3">
      <Header title="Contact" />
      <p className="centerText">Lets get in touch. Send us a message</p>

      <Form
        method="post"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Row className="contactRows mb-3" lg={6}>
          <Form.Group as={Col} lg="3">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              name="firstName"
              placeholder="First name"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          {/* lastname */}
          <Form.Group as={Col} lg="3">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              name="lastName"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          {/* Email */}
        </Row>

        {/* otherstuff */}
        <Row className="contactRows mb-3" lg={6}>
          <Form.Group as={Col} lg={6}>
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="janedoe@msn.com"
                name="email"
                required
                // onChange= {()=>setSendersEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter an email.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <Row className="contactRows mb-3" lg={6}>
          <Form.Group as={Col} lg={6}>
            <Form.Label>Subject</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Subject"
                name="subject"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a subject.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <Row className="contactRows mb-3" lg={6}>
          <Form.Group as={Col} lg={6}>
            <Form.Label>Message</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                as="textarea"
                placeholder="Message"
                name="message"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a message
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        {/* dependency that will send to email on submit  */}
        <Button id="basicBtn" className="centerBtn primaryBtn" type="submit">
          {" "}
          <FontAwesomeIcon icon={faPaperPlane} />
          {"   "}
          Send Message
        </Button>
      </Form>
    </div>
  );
}
