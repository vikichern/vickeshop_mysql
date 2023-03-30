import { CircularProgress, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, ListGroup, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { myServer } from "../../endpoints/endpoints";
import Profile from "../../models/Profile";
import { getProfilesAsync, selectProfiles } from "./panelSlice";

const PanelProfiles = () => {
  const dispatch = useAppDispatch();
  const profiles = useAppSelector(selectProfiles);

  useEffect(() => {
    dispatch(getProfilesAsync());
  }, [dispatch]);

  const observer = useRef<IntersectionObserver | null>(null);
  const myDivRef = useRef<HTMLDivElement>(null);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting) {
        setShowSpinner(true);
        setTimeout(() => {
          setLimit(limit + 10);
          setShowSpinner(false);
        }, 300);
      }
    });

    if (myDivRef.current) {
      observer.current.observe(myDivRef.current);
    }
  }, [myDivRef, limit]);

  const navigate = useNavigate();

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
        <h2>PROFILES</h2>
        <div style={{ height: "100px" }} />
        <h5>PROFILE LIST</h5>
        <br />

        {isScrolling ? (
          <div
            style={{ position: "fixed", width: "20%", right: "5%", top: 380 }}
          >
            <Button variant="warning" style={{ width: "100%" }}>
              <Link
                to="/admin_panel/panel_main"
                style={{ textDecoration: "none", color: "black" }}
              >
                <b>BACK TO MENU</b>
              </Link>
            </Button>
          </div>
        ) : (
          <div style={{ position: "fixed", width: "20%", right: "5%" }}>
            <Link
              to="/admin_panel/panel_main"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Button variant="warning" style={{ width: "100%" }}>
                <b>BACK TO MENU</b>
              </Button>
            </Link>
          </div>
        )}

        <Col xs={9}>
          <Table striped bordered hover>
            <thead>
              <tr style={{ backgroundColor: "#5A5A5A", color: "white" }}>
                <th>Profile ID</th>
                <th>Picture</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Location</th>
                <th>Bio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {profiles.slice(0, offset + limit).map((profile: Profile) => (
                <tr key={profile.id}>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      height: "100px",
                    }}
                  >
                    {profile.user}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      height: "100px",
                    }}
                  >
                    <img
                      src={
                        profile.picture ? myServer + profile.picture : "UNKNOWN"
                      }
                      alt="profile"
                      height="100"
                      width="120"
                    />
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      height: "100px",
                    }}
                  >
                    {profile.first_name ? profile.first_name : "UNKNOWN"}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      height: "100px",
                    }}
                  >
                    {profile.last_name ? profile.last_name : "UNKNOWN"}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      height: "100px",
                    }}
                  >
                    {profile.location ? profile.location : "UNKNOWN"}
                  </td>
                  <td
                    style={{
                      textAlign: "left",
                      verticalAlign: "top",
                      height: "100px",
                    }}
                  >
                    <small>{profile.bio ? profile.bio : "UNKNOWN"}</small>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      height: "100px",
                    }}
                  >
                    <Button
                      variant="none"
                      style={{
                        color: "orange",
                        border: "none",
                        background: "none",
                        padding: 0,
                        textDecoration: "none",
                      }}
                      onClick={() =>
                        navigate(
                          `/admin_panel/user_details_addresses/${profile.user}`
                        )
                      }
                    >
                      <b>WATCH PROFILE</b>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
         
        {profiles.length >= offset + limit && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "25vh",
            }}
          >
            {showSpinner && (
              <Stack>
                <CircularProgress color="warning" />
              </Stack>
            )}
          </div>
        )}
        <div ref={myDivRef} />

        <div style={{ height: "134px" }} />

      </Container>
    </div>
  );
};

export default PanelProfiles;
