import React from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const PanelMain = () => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate("/admin_panel/user_details_profiles");
  };

  const handleUserClick2 = () => {
    navigate("/admin_panel/user_details_profiles");
  };

  return (
    <div>
      <div style={{ height: "100px" }} />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <Link to="/admin_panel/order_details" onClick={handleUserClick2}>
              <img
                style={{ height: "550px" }}
                src={require("../../images/products.png")}
                alt="product"
              />
              <h1
                style={{
                  color: "white",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                PRODUCTS
              </h1>
            </Link>
          </div>
          <div style={{ position: "relative" }}>
            <Link
              to="/admin_panel/user_details_profiles"
              onClick={handleUserClick}
            >
              <img
                style={{ height: "550px" }}
                src={require("../../images/users.png")}
                alt="user"
              />
              <h1
                style={{
                  color: "white",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                USERS
              </h1>
            </Link>
          </div>
        </div>
      </Container>
      <div style={{ height: "100px" }} />
    </div>
  );
};

export default PanelMain;
