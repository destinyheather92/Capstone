import { Card, Button } from "react-bootstrap";

export default function Cards({key, title, handleClick, className, style, textColor,header,text,btnText }) {
  return (
    <Card
          key={key}
          text={textColor}
          style={style}
          className={`mb-2 ${className}`}
        >
          <Card.Header>{header}</Card.Header>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              {text}
            </Card.Text>
             <Button variant="secondary" onClick={handleClick}>{btnText}</Button>
          </Card.Body>
        </Card>
  );
}
