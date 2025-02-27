import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer px-0 px-lg-3">
        <Container fluid>
          <nav>
            <ul className="footer-menu">
              <li>
                <a href="dashboard" >
                  Home
                </a>
              </li>
            </ul>
            <p className="copyright text-center">
              © {new Date().getFullYear()}{" "}
              <a href="https://localville.in/" target="_blank">
                Localville
              </a>{" "}
              We make your business online
            </p>
          </nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;
