import React from "react";
import Header from "../../Components/Header/Header";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Error() {
    const navigate = useNavigate()
  return (
    <div>
      <Header title="You have reached this page in Error" />
      <Button
        id="basicBtn"
        className="centerBtn primaryBtn"
        onClick={()=>navigate("/")}
      >
        Go Home
      </Button>
    </div>
  );
}
