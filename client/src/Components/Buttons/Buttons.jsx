import { Button } from "react-bootstrap"

export default function Buttons({onClick, text, className,id}) {
  return (
  <Button id={id}className={className} onClick={onClick}variant="light">{text}</Button>
  )
}


