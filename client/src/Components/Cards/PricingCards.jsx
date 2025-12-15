import React from "react";
import { Card, ListGroup } from "react-bootstrap";
// features will be an array of all the features
export default function PricingCards({ title, borderID, price, features, customCssID, handleSignUp}) {
  return (
    <div>
      <Card
        id={customCssID}
        className="centerText hover-shadow"
        border="secondary"
        style={{ width: "90%"}}
      >
        <Card.Body id={borderID}>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush centerText">
          {features.map((e) => {
            return <ListGroup.Item>{e}</ListGroup.Item>;
          })}
          <ListGroup.Item className="prices">
            <h2>{price}</h2>
            <span class="priceOpacity">per month</span>
          </ListGroup.Item>
        </ListGroup>
        <Card.Body className="cardFooter">
          <button className="signUpBtn" onClick={handleSignUp}>Sign Up</button>
        </Card.Body>
      </Card>
    </div>
  );
}
