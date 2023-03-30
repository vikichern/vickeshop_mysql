import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AdminNavigator from "../navigators/AdminNavigator";
import {
  getSingleAddressAsync,
  selectSingleAddress,
} from "../shipping/shippingSlice";
import { patchUserAddressAsync } from "./panelSlice";

const UpdateUserAddress = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const singleAddress = useAppSelector(selectSingleAddress);

  const [first_name, setFirst_name] = useState<string>("");
  const [last_name, setLast_name] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [postal_code, setPostal_code] = useState<number | undefined>(
    singleAddress.postal_code
  );
  const [country, setCountry] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (postal_code) {
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("postal_code", postal_code.toString());
      formData.append("country", country);
    }
    dispatch(
      patchUserAddressAsync({
        addressData: formData,
        id: String(singleAddress.id),
      })
    );
    navigate(`/admin_panel/user_details_addresses/${singleAddress.user}`);
  };

  useEffect(() => {
    setFirst_name(singleAddress.first_name);
    setLast_name(singleAddress.last_name);
    setAddress(singleAddress.address);
    setCity(singleAddress.city);
    setState(singleAddress.state);
    setPostal_code(singleAddress.postal_code);
    setCountry(singleAddress.country);
  }, [singleAddress]);

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSingleAddressAsync(id));
    }
  }, [id, dispatch]);

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 110) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    });
  }, [dispatch]);

  return (
    <div>
      <Container>
        <br />
        <br />
        <h2>EDIT ADDRESS</h2>
        <div style={{ height: "100px" }} />
        <h5>ADDRESS DETAILS</h5>
        <br />
        {isScrolling ? (
          <div style={{ position: "absolute", top: 380 }}>
            <AdminNavigator />
          </div>
        ) : (
          <div style={{ position: "absolute" }}>
            <AdminNavigator />
          </div>
        )}
        <Row className="justify-content-left mt-3">
          <Col md={7}>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={first_name}
                      onChange={(event) => setFirst_name(event.target.value)}
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
                      value={last_name}
                      onChange={(event) => setLast_name(event.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formState">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      value={state}
                      onChange={(event) => setState(event.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formPostalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="number"
                      value={postal_code}
                      onChange={(event) =>
                        setPostal_code(Number(event.target.value))
                      }
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      value={country}
                      onChange={(event) => setCountry(event.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-center mt-3">
                <Button variant="warning" type="submit">
                  COMPLETE EDITING
                </Button>
                <br />
                <br />
                <div style={{ height: "20px" }} />
                <Button
                  onClick={() => {
                    navigate(
                      `/admin_panel/user_details_addresses/${singleAddress.user}`
                    );
                  }}
                  variant="secondary"
                  style={{ width: "10%" }}
                >
                  CANCLE
                </Button>
              </Row>
              <br />
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateUserAddress;
