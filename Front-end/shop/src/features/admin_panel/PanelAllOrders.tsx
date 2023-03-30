import React, { useEffect, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getOrdersAsync, selectOrders } from "../order/orderSlice";
import AdminProdNavigator from "../navigators/AdminProdNavigator";

const AllOrders = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectOrders);

  useEffect(() => {
    dispatch(getOrdersAsync());
  }, [dispatch]);

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
        <h2>ORDERS</h2>
        <div style={{ height: "100px" }} />
        <h5>ORDER LIST</h5>
        <br />
        {isScrolling ? (
          <div style={{ position: "absolute", top: 380 }}>
            <AdminProdNavigator />
          </div>
        ) : (
          <div style={{ position: "absolute" }}>
            <AdminProdNavigator />
          </div>
        )}

        <table className="table table-striped" style={{ width: "75%" }}>
          <thead>
            <tr
              style={{
                backgroundColor: "#5A5A5A",
                color: "white",
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              <th>User ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Adress</th>
              <th>Amount</th>
            </tr>
          </thead>
          <div>
            {orders.length === 0 ? (
              <Alert
                variant="info"
                className="d-none d-lg-block"
                style={{ position: "absolute", width: "965px" }}
              >
                <Alert.Heading>THERE ARE NO ORDERS YET!</Alert.Heading>
                <b>
                  You are welcome to browse the collections and find your item.
                </b>
              </Alert>
            ) : (
              ""
            )}
          </div>
          <tbody>
            {[...orders].reverse().map((order) => (
              <tr
                key={order.id}
                style={{ textAlign: "center", verticalAlign: "middle" }}
              >
                <td>{order.user}</td>
                <td>{order.product.product_name}</td>
                <td>${order.price}</td>
                <td>
                  <small>
                    {order.shipping_address.first_name}{" "}
                    {order.shipping_address.last_name} <br />
                    {order.shipping_address.state}{" "}
                    {order.shipping_address.country}{" "}
                    {order.shipping_address.city}{" "}
                    {order.shipping_address.address}{" "}
                    {order.shipping_address.postal_code}{" "}
                  </small>
                </td>
                <td>{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ height: "334px" }} />
      </Container>
    </div>
  );
};

export default AllOrders;
