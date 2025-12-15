import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../Statistics/Statistics.css";
export default function Statistics() {
  return (
    <Container fluid className="accentBG p-5">
      <Row id="statisticsRow">
        <Col sm={3}>
          <span className="nums">14+</span>
          <br />
          Partners
        </Col>
        <Col sm={3}>
          <span className="nums">55+</span>
          <br />
          Projects Done
        </Col>
        <Col sm={3}>
          <span className="nums">89+</span>
          <br />
          Happy Clients
        </Col>
        <Col sm={3}>
          <span className="nums">150+</span>
          <br />
          Meetings
        </Col>
      </Row>
    </Container>
  );
}
