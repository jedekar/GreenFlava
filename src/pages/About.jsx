import React from "react";
//import './FontAwesome';
import "../App.css";

function About() {
  return (
    <div className="App">
      <h1 className="mb-10 mt-5">About</h1>

      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <p class="lead" className="about-text">
              The GreenFlava project was created for more convenient
              communication of individuals with the aim of transporting goods.
            </p>
          </div>
        </div>
      </div>

      <h1 class="mt-5">Our team</h1>

      <div class="row text-center">
        <div class="col-xl-4 col-sm-6 mb-5">
          <div class="bg-white rounded shadow-sm py-5 px-4">
            <img
              src="https://i.imgur.com/jGQ662f.jpg"
              alt=""
              width="100"
              class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
            />
            <h5 class="mb-0">Nikita Kanyka</h5>
            <span class="small text-uppercase text-muted">Frontend Dev.</span>
            <ul class="social mb-0 list-inline mt-3">
              <li class="list-inline-item">
                <a
                  href="https://www.instagram.com/pretty_good_1337/"
                  class="social-link"
                >
                  <i class="fa fa-instagram"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="https://github.com/niksonax" class="social-link">
                  <i class="fa fa-github"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-xl-4 col-sm-6 mb-5">
          <div class="bg-white rounded shadow-sm py-5 px-4">
            <img
              src="https://res.cloudinary.com/mhmd/image/upload/v1556834130/avatar-3_hzlize.png"
              alt=""
              width="100"
              class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
            />
            <h5 class="mb-0">Nazar Smirnov</h5>
            <span class="small text-uppercase text-muted">Backend Dev.</span>
            <ul class="social mb-0 list-inline mt-3">
              <li class="list-inline-item">
                <a href="https://github.com/Toolf" class="social-link">
                  <i class="fa fa-github"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-xl-4 col-sm-6 mb-5">
          <div class="bg-white rounded shadow-sm py-5 px-4">
            <img
              src="https://i.imgur.com/CwgH2NI.png"
              alt=""
              width="100"
              class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
            />
            <h5 class="mb-0">Alexander Khodos</h5>
            <span class="small text-uppercase text-muted">Middleware Dev.</span>
            <ul class="social mb-0 list-inline mt-3">
              <li class="list-inline-item">
                <a href="https://github.com/jedekar" class="social-link">
                  <i class="fa fa-github"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ul class="list-unstyled text-center">
        <h3 class="mt-5">Tools used:</h3>
        <li>Bootstrap 4.4.1</li>
        <li>React 16.13.10</li>
        <li>Reactstrap 8.4.1</li>
      </ul>

      <footer class="bg-light pb-5 center">
        <div class="text-center ">
          <p class="font-italic text-muted text-center">
            &copy; Copyrights GreenFlava.com. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default About;
