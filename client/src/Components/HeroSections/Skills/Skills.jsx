import React from "react";
import Header from "../../Header/Header";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonDigging,
  faDesktop,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import "../Skills/Skills.css";

export default function Skills() {
  return (
    <Container fluid="md" className="p-5">
      {/* containeer */}
      <Header title={"Our Skills"} />
      <Row>
        <Col md={6}>
          <p>
            {" "}
            Most tech companies that serve the construction industry have
            limited expertise in the construction field, thus limiting a total
            understanding of the challenges that these companies may face{" "}
          </p>
          <p>
            At Construction Tracker, we bring together extensive knowledge from
            both Construction industries and Tech industries to create
            user-friendly services with an emphasis on business solutions to
            give our customers the best quality product.
          </p>
        </Col>
        <Col md={6}>
          <div>
            <FontAwesomeIcon icon={faPersonDigging} />
            Construction
            <ProgressBar animated now={90} label={`90%`} />
          </div>
          <div class="w3-wide">
            <FontAwesomeIcon icon={faDesktop} />
            Web Design
            <ProgressBar animated now={85} label={`85%`} />
          </div>
          <div>
            <FontAwesomeIcon icon={faBriefcase} />
            Business Solutions
            <ProgressBar animated now={75} label={`75%`} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
