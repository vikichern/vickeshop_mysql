import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const MyFooter = () => {
  return (
    <footer
      style={{ width: "100%" }}
      color="#fe847f"
      className="bg-black text-light py-2"
    >
      <Container style={{ color: "#1e847f" }}>
        <Row>
          <Col>
            <h4>VicK E-Shop</h4>
            <p>
              We believe that your home is a reflection of your personality and
              style,
              <br></br>
              and we will help you create a space that is uniquely yours.
            </p>
          </Col>
          <Col md={3}>
            <div>
              <a
                href="https://www.google.com/maps/place/Haifa/@32.7995444,34.87669,11z/data=!3m1!4b1!4m6!3m5!1s0x151dba4c750de845:0xc35d23982a81529a!8m2!3d32.7940463!4d34.989571!16zL20vMGZnMWc"
                target="_blank"
                className="text-link"
              >
                <i className="fa-solid fa-location-dot" /> Haifa, Israel
              </a>
            </div>
            <div>
              <a
                href="tel:+(00)990000000"
                target="_blank"
                className="text-link"
              >
                <i className="fa-solid fa-phone" /> +(972) 54 000 00 00
              </a>
            </div>
            <div>
              <a
                href="mailto:vick-e-shop@email.com"
                target="_blank"
                className="text-link"
              >
                <i className="fa-solid fa-envelope" color="white" />{" "}
                vick-e-shop@email.com
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">Copyright &copy; Vick E-Shop</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MyFooter;
