import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FooterImg from "../../assets/images/construction00.jpg";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer({ text }) {
  return (
    <>
      <div>
        <img src={FooterImg} alt="Construction Site" className="footerImg" />
      </div>
      <div class="footer p-3">
        <p>{text}</p>
        <div id="flexContainer">
          <p>
            <FontAwesomeIcon className="iconSize" icon={faLocationDot} />{" "}
            <span className="contactInfo">Columbia, SC</span>
          </p>
          <p>
            <FontAwesomeIcon className="iconSize" icon={faPhone} />{" "}
            <span className="contactInfo">1-800-123-4567</span>
          </p>
          <p>
            <FontAwesomeIcon className="iconSize" icon={faEnvelope} />{" "}
            <span className="contactInfo">contstructionTracker@gmail.com</span>
          </p>
        </div>
      </div>
    </>
  );
}
