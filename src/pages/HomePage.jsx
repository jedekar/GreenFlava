import React from "react";
import "./w3styles.css";
import "../App.css";

function HomePage() {
  return (
    <div>
      <header class="bgimg-1 w3-display-container w3-grayscale-min" id="home">
        <div class="w3-display-left w3-text-white" style={{ padding: "48px" }}>
          <span class="w3-jumbo w3-hide-small">
            Shipping has never been easier
          </span>
          <br></br>
          <span class="w3-xxlarge w3-hide-large w3-hide-medium">
            Delivery never been so easy
          </span>
          <br></br>
          <span class="w3-large">
            Stop wasting delivery time. Contact driver directly.
          </span>
          <p>
            <a
              href="sign-up"
              class="w3-button w3-white w3-padding-large w3-large w3-margin-top w3-opacity w3-hover-opacity-off"
            >
              Try it now
            </a>
          </p>
        </div>
        <div
          class="w3-display-bottomright-about w3-text-grey w3-large"
          style={{ padding: "24px 48px" }}
        >
          {/* <i class="fa fa-facebook-official w3-hover-opacity"></i>
          <i class="fa fa-instagram w3-hover-opacity"></i>
          <i class="fa fa-snapchat w3-hover-opacity"></i>
          <i class="fa fa-pinterest-p w3-hover-opacity"></i>
          <i class="fa fa-twitter w3-hover-opacity"></i>
          <i class="fa fa-linkedin w3-hover-opacity"></i> */}
          <a href="about" class="no-bottomline nav-links-main about-text lead">
            About us
          </a>
        </div>
      </header>
    </div>
  );
}

export default HomePage;
