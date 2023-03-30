import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Category } from "../../models/Category";
import { selectCategories } from "../category/categorySlice";
import AdminProdNavigator from "../navigators/AdminProdNavigator";
import { postProductAsync } from "../product/productSlice";

const PostProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const categories = useAppSelector(selectCategories);

  const [category, setCategory] = useState<number>(1);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [picture, setPicture] = useState<any>(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("category", category.toString());
    formData.append("product_name", productName);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("picture", picture);

    dispatch(postProductAsync(formData));
    setCategory(1);
    setProductName("");
    setDescription("");
    setPrice(0);
    setPicture("");

    navigate("/admin_panel/product_details/");
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPicture(event.target.files ? event.target.files[0] : undefined);
  };

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
        <Col md={9}>
          <br />
          <br />
          <h2>PRODUCTS</h2>
          <div style={{ height: "100px" }} />
          <h5>ADD PRODUCT</h5>
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
          <Form onSubmit={handleSubmit}>
            <Row className="justify-content-left mt-3">
              <Col md={6}>
                <Form.Group controlId="formCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(event) =>
                      setCategory(Number(event.target.value))
                    }
                    required
                  >
                    {categories.map((category: Category) => (
                      <option key={category.id} value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formProductName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(event) => setProductName(event.target.value)}
                    value={productName}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(event) => setPrice(Number(event.target.value))}
                    value={price}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPicture">
                  <Form.Label>Picture</Form.Label>
                  <Form.Control type="file" onChange={handlePictureChange} />
                </Form.Group>
                <br />
              </Col>
            </Row>

            <Row className="justify-content-center mt-3">
              <Button
                style={{
                  width: "475px",
                  position: "absolute",
                  transform: "translateX(-250px",
                }}
                variant="warning"
                type="submit"
              >
                Create New Product
              </Button>
              <Button
                onClick={() => {
                  navigate(`/admin_panel/product_details/`);
                }}
                variant="secondary"
                style={{
                  width: "100px",
                  position: "absolute",
                  transform: " translateX(-250px) translateY(50px) ",
                }}
              >
                CANCLE
              </Button>
              <br />
              <br />
            </Row>
            <br />
            <br />
            <hr />
          </Form>
        </Col>
      </Container>

      <div style={{ height: "130px" }} />
    </div>
  );
};

export default PostProduct;
