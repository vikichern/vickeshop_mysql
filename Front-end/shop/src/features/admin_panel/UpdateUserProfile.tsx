import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AdminNavigator from "../navigators/AdminNavigator";
import {
  getSingleProfileAsync,
  patchUserProfileAsync,
  selectSingleProfile,
} from "./panelSlice";

const UpdateUserProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSingleProfileAsync(id));
    }
  }, [id, dispatch]);

  const single_profile = useAppSelector(selectSingleProfile);

  const [picture, setPicture] = useState<any>(null);
  const [bio, setBio] = useState<string>("");
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (picture) {
      formData.append("picture", picture);
    }
    formData.append("bio", bio);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("location", location);
    dispatch(
      patchUserProfileAsync({
        profileData: formData,
        id: String(single_profile.user),
      })
    );

    navigate(`/admin_panel/user_details_addresses/${single_profile.user}`);
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPicture(event.target.files ? event.target.files[0] : undefined);
  };
  return (
    <div>
      <Container>
        <Col md={9}>
          <br />
          <br />
          <h2>EDIT PROFILE</h2>
          <div style={{ height: "100px" }} />
          <h5>PROFILE DETAILS</h5>
          <br />
          <div style={{ position: "absolute", top: 380 }}>
            <AdminNavigator />
          </div>
          <Card style={{ width: "960px", height: "250px" }}>
            <Form onSubmit={handleSubmit}>
              <Card.Body>
                <Row
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Col md={4}>
                    <Form.Group controlId="formPicture">
                      <Form.Label>Picture</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={handlePictureChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <b>FIRST NAME:</b>{" "}
                        <input
                          type="text"
                          onChange={(event) => setFirstName(event.target.value)}
                        />
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>LAST NAME:</b>{" "}
                        <input
                          type="text"
                          onChange={(event) => setLastName(event.target.value)}
                        />
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>LOCATION:</b>{" "}
                        <input
                          type="text"
                          onChange={(event) => setLocation(event.target.value)}
                        />
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col md={4}>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <b>BIO:</b>
                        <hr />
                        <input
                          type="text"
                          onChange={(event) => setBio(event.target.value)}
                        />
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Card.Body>
              <br />
              <br />
              <div>
                <Button
                  variant="warning"
                  type="submit"
                  style={{ float: "right", transform: "translateY(-30px)" }}
                >
                  COMPLETE EDITING
                </Button>
              </div>
              <br />
              <Button
                onClick={() =>
                  navigate(
                    `/admin_panel/user_details_addresses/${single_profile.user}`
                  )
                }
                variant="secondary"
                style={{
                  float: "right",
                  transform: "translateY(-54px) translateX(-15px)",
                }}
              >
                CANCEL
              </Button>
            </Form>
          </Card>
        </Col>
      </Container>

      <div style={{ height: "130px" }} />

      <AdminNavigator />
    </div>
  );
};

export default UpdateUserProfile;
