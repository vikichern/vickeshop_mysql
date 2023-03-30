import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { Address } from "../../models/Shipping";
import { logoutAsync, reset } from "../authentication/authenticationSlice";
import ProfileNavigator from "../navigators/ProfileNavigator";
import { postAddressAsync } from "./shippingSlice";



const ShippingAdd = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState<number>(0);
  const [country, setCountry] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const shippingData: Address = {
      id: 0,
      first_name: firstName,
      last_name: lastName,
      address,
      city,
      state,
      postal_code: postalCode,
      country,
    };
    dispatch(postAddressAsync(shippingData));
    setFirstName("");
    setLastName("");
    setAddress("");
    setCity("");
    setState("");
    setPostalCode(0);
    setCountry("");
  };

  const onLogout = () => {
    dispatch(logoutAsync());
    dispatch(reset());
    navigate("/")
  };



  const [isScrolling, setIsScrolling] = useState(false);
      
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 110) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    });
  }, []);


  return (
    <div>
      <Container>
        <br />
        <br />
        <h2>YOUR ADDRESSES</h2>
        <br />
        <br />
        <h5>CREATE ADDRESSES</h5>
        { isScrolling ? (<div style = {{position: "absolute", top: 299}}><ProfileNavigator /></div>) : (<div style = {{position: "absolute"}}><ProfileNavigator /></div>) }
        <Row className="justify-content-left mt-3">
          <Col md={7}>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-center">
                <Col md={6}>
                  <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(event) => setFirstName(event.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(event) => setLastName(event.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formState">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(event) => setState(event.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formPostalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="number"
                      onChange={(event) =>
                        setPostalCode(Number(event.target.value))
                      }
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row >
                <Col md={12}>
                  <Form.Group controlId="formCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(event) => setCountry(event.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-center mt-3">
                <Button
                  variant="warning"
                  type="submit"
                  onClick={() => {
                    window.location.href = "/shipping/";
                  }}
                >
                  CREATE NEW ADDRESS
                </Button>
                <br />
                <br />
                <Link to="/shipping"><br />
                  <Button
                    variant="secondary"
                    style={{ float: "right", transform: " translateX(-338px) " }}
                  >
                    CANCLE
                  </Button>
                  
                </Link>
                </Row>
                </Form>
              
              <br />
              <br />
              <br />
              <br />
            
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShippingAdd;
