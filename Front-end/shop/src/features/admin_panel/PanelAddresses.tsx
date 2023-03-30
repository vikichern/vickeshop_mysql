import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Address } from "../../models/Shipping";
import { deleteAddressAsync } from "../shipping/shippingSlice";
import AdminNavigator from "../navigators/AdminNavigator";
import NavUserProfile from "./NavUserProfile";
import { getAllAddressesAsync, selectAddresses } from "./panelSlice";

const PanelAddresses = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addresses = useAppSelector(selectAddresses);

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getAllAddressesAsync(id));
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
        <h2>ADDRESSES</h2>
        <div style={{ height: "100px" }} />
        <h5>USER ADDRESSES</h5>

        <NavUserProfile />

        <br />
        <Row>
          {isScrolling ? (
            <div style={{ position: "absolute", top: 380 }}>
              <AdminNavigator />
            </div>
          ) : (
            <div style={{ position: "absolute" }}>
              <AdminNavigator />
            </div>
          )}

          <Col xs={9}>
            <Table striped bordered hover>
              <thead>
                <tr style={{ backgroundColor: "#5A5A5A", color: "white" }}>
                  <th style={{ textAlign: "center" }}>Address ID</th>
                  <th style={{ textAlign: "center" }}>First name</th>
                  <th style={{ textAlign: "center" }}>Last name</th>
                  <th style={{ textAlign: "center" }}>Address</th>
                  <th style={{ textAlign: "center" }}>City</th>
                  <th style={{ textAlign: "center" }}>State</th>
                  <th style={{ textAlign: "center" }}>Country</th>
                  <th style={{ textAlign: "center" }}>Postal Code</th>
                  <th style={{ textAlign: "center" }}></th>
                </tr>
              </thead>

              {addresses.length === 0 ? (
                <Alert
                  variant="info"
                  style={{ position: "absolute", width: "965px" }}
                >
                  <br />
                  <Alert.Heading>USER HAS NO ADDRESSES YET!</Alert.Heading>
                  <b>The requested user has no addresses yet.</b>
                </Alert>
              ) : (
                ""
              )}
              <tbody>
                {addresses.map((address: Address) => (
                  <tr key={address.id} style={{ backgroundColor: "white" }}>
                    <td style={{ textAlign: "center" }}>{address.id}</td>
                    <td style={{ textAlign: "center" }}>
                      {address.first_name}
                    </td>
                    <td style={{ textAlign: "center" }}>{address.last_name}</td>
                    <td style={{ textAlign: "center" }}>{address.address}</td>
                    <td style={{ textAlign: "center" }}>{address.city}</td>
                    <td style={{ textAlign: "center" }}>{address.state}</td>
                    <td style={{ textAlign: "center" }}>{address.country}</td>
                    <td style={{ textAlign: "center" }}>
                      {address.postal_code}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        style={{
                          color: "blue",
                          border: "none",
                          background: "none",
                          padding: 0,
                        }}
                        onClick={() =>
                          navigate(
                            `/admin_panel/user_details_update_address/${address.id}`
                          )
                        }
                      >
                        Edit
                      </button>{" "}
                      |{" "}
                      <a
                        style={{ color: "red", textDecoration: "none" }}
                        href=""
                        onClick={() =>
                          address.id && dispatch(deleteAddressAsync(address.id))
                        }
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <div style={{ height: "350px" }} />
      </Container>
    </div>
  );
};

export default PanelAddresses;
