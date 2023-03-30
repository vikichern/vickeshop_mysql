import { CircularProgress, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { myServer } from "../../endpoints/endpoints";
import { Product } from "../../models/Product";
import AdminProdNavigator from "../navigators/AdminProdNavigator";
import { deleteProductAsync, selectProducts } from "../product/productSlice";

const PanelProducts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const products = useAppSelector(selectProducts);

  const observer = useRef<IntersectionObserver | null>(null);
  const myDivRef = useRef<HTMLDivElement>(null);

  const [offset] = useState(0);
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
        <h2>PRODUCTS</h2>
        <div style={{ height: "100px" }} />
        <h5>PRODUCT LIST</h5>
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
        <Col xs={9}>
          <Table striped bordered hover>
            <thead>
              <Button
                variant="warning"
                style={{
                  position: "absolute",
                  transform: " translateX(835px) translateY(-50px)",
                }}
              >
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/admin_panel/post_product/`}
                >
                  Add Product
                </Link>
              </Button>
              <tr
                style={{
                  backgroundColor: "#5A5A5A",
                  color: "white",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                <th>Product ID</th>
                <th>Picture</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category ID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, offset + limit).map((product: Product) => (
                <tr key={product.id}>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      height: "100px",
                    }}
                  >
                    {product.id}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      height: "100px",
                    }}
                  >
                    <img
                      src={myServer + product.picture}
                      alt="product"
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
                    {product.product_name}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      height: "100px",
                    }}
                  >
                    {product.description}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      height: "100px",
                    }}
                  >
                    {product.price}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      height: "100px",
                    }}
                  >
                    {product.category}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      height: "100px",
                    }}
                  >
                    <Button
                      style={{
                        color: "blue",
                        border: "none",
                        background: "none",
                      }}
                      onClick={() =>
                        navigate(`/admin_panel/update_product/${product.id}`)
                      }
                    >
                      Edit
                    </Button>
                    |
                    <Button
                      style={{
                        color: "red",
                        border: "none",
                        background: "none",
                      }}
                      onClick={() =>
                        dispatch(deleteProductAsync(Number(product.id)))
                      }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        {products.length >= offset + limit && (
          <div
            style={{
              position: "absolute",
              transform: "translateX(480px) translateY(30px)",
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

        <div style={{ height: "334px" }} />
      </Container>
    </div>
  );
};

export default PanelProducts;
