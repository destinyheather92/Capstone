import "../Hero/Hero.css";



export default function Hero({ registerClick }) {
  return (
      <div className="containerDiv heroImg">
        <div id="position">
          <p className="largeHero hideSmall">Start something that matters</p>

          <p className="mediumHero">
            Stop wasting valuable time with technology that just isn't you.
          </p>
          {/* //when the user clicks direct them to the registration form, this isnt a modal, you need to update  the form fields, preferably use validation. */}
          <p id="registerLink" onClick={registerClick}>
            Register Your Company Today
          </p>
        </div>
      </div>

  );
}
