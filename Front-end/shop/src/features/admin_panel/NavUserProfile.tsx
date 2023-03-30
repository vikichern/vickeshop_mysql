import React, { useEffect } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { myServer } from "../../endpoints/endpoints";
import { getSingleProfileAsync, selectSingleProfile } from "./panelSlice";

const NavUserProfile = () => {
  const dispatch = useAppDispatch();

  const single_profile = useAppSelector(selectSingleProfile);

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSingleProfileAsync(id));
    }
  }, [id, dispatch]);
  return (
    <div
    style={{ position: "absolute", width: "610px", top: 180, left: "30.8%" }}
    >
      <Link
        to={`/admin_panel/user_details_update_profile/${single_profile.user}`}
        style={{ textDecoration: "none" }}
      >
        <div
          style={{
            color: "black",
            textAlign: "left",
            position: "absolute",
            transform: " translateX(0px) translateY(-25px) ",
          }}
        >
          <b>CLICK TO EDIT PROFILE</b>
        </div>

        <Card>
          <Card.Body>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col md={4}>
                {single_profile.picture ? (
                  <img
                    style={{
                      position: "absolute",
                      transform: "translateX(10px) translateY(-64px)",
                    }}
                    alt="mypicture"
                    height={130}
                    width={145}
                    src={myServer + single_profile.picture}
                  />
                ) : (
                  "UNKNOWN"
                )}
              </Col>
              <Col md={4}>
                <ListGroup variant="flush" style={{ fontSize: "12px" }}>
                  <ListGroup.Item>
                    <b>ID:</b> {single_profile.user}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>FIRST NAME:</b>{" "}
                    {single_profile.first_name
                      ? `${single_profile.first_name}`
                      : "UNKNOWN"}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <b>LAST NAME:</b>{" "}
                    {single_profile.last_name
                      ? `${single_profile.last_name}`
                      : "UNKNOWN"}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <b>LOCATION:</b>{" "}
                    {single_profile.location
                      ? `${single_profile.location}`
                      : "UNKNOWN"}
                  </ListGroup.Item>
                </ListGroup>
              </Col>

              <Col md={4}>
                <ListGroup variant="flush" style={{ fontSize: "12px" }}>
                  <ListGroup.Item>
                    <b>BIO:</b>
                    <hr />
                    {single_profile.bio ? `${single_profile.bio}` : "UNKNOWN"}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default NavUserProfile;
