import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteProductAsync,
  getSingleProductAsync,
  patchProductAsync,
  selectSingleProduct,
} from "./productSlice";
import {
  Accordion,
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { addProduct } from "../cart/cartSlice";
import { Link, useParams } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { selectCategories } from "../category/categorySlice";
import { getReviewsProductAsync } from "../reviews/reviewsSlice";
import ProductReviews from "../reviews/ProductReviews";
import { myServer } from "../../endpoints/endpoints";

const Product = () => {
  const dispatch = useAppDispatch();

  const single_product = useAppSelector(selectSingleProduct);
  const categories = useAppSelector(selectCategories);

  const storedIsStaff = JSON.parse(localStorage.getItem("is_staff") as string);

  const [selectedOption, setSelectedOption] = useState(
    single_product.price <= 50 ? "Free Shipping! - 0$" : "Express Shipping - 5$"
  );

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSingleProductAsync(id));
      dispatch(getReviewsProductAsync(Number(id)));
    }
  }, [id, dispatch]);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [showForm, setShowForm] = useState(false);

  const [productName, setProductName] = useState<string>(
    single_product.product_name
  );
  const [description, setDescription] = useState<string>(
    single_product.description
  );
  const [price, setPrice] = useState<number>(single_product.price);
  const [category, setCategory] = useState<number>(single_product.category);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("category", category.toString());
    dispatch(
      patchProductAsync({
        productData: formData,
        id: String(single_product.id),
      })
    );
    setTimeout(() => {
      window.location.reload();
    }, 10);
  };

  const handleProductNameChange = (event: any) => {
    setProductName(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event: any) => {
    setPrice(event.target.value);
  };

  return (
    <div>
      <div>
        <Container>
          <Row>
            <Col>
              <br />
              <br />
              <br />
              <br />
              <img
                width={600}
                height={600}
                alt="600x600"
                src={myServer + single_product.picture}
              ></img>
            </Col>

            <Col>
              <br />
              <br />
              <br />
              {storedIsStaff ? (
                <div>
                  <Button
                    variant="warning"
                    onClick={() => setShowForm(!showForm)}
                  >
                    {" "}
                    <h4>
                      <BsFillPencilFill />
                    </h4>{" "}
                  </Button>
                </div>
              ) : (
                ""
              )}
              <Modal show={showModal} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <BsTrash /> Delete Warning
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to delete "{single_product.product_name}
                  "?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Link to={`/`}>
                    <Button
                      variant="danger"
                      onClick={() =>
                        single_product.id &&
                        dispatch(deleteProductAsync(single_product.id))
                      }
                    >
                      Delete
                    </Button>
                  </Link>
                </Modal.Footer>
              </Modal>

              {showForm && (
                <Row className="justify-content-center mt-3">
                  <Col md={7}>
                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
                      <Row className="justify-content-center align-items-center mt-3">
                        <Col md={6}>
                          <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                              as="select"
                              onChange={(event) =>
                                setCategory(Number(event.target.value))
                              }
                            >
                              {categories.map((category) => (
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
                              onChange={handleProductNameChange}
                            />
                          </Form.Group>
                          <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              type="text"
                              onChange={handleDescriptionChange}
                            />
                          </Form.Group>
                          <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                              type="number"
                              onChange={handlePriceChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button
                        onClick={handleShow}
                        variant="danger"
                        style={{
                          position: "absolute",
                          transform: "translateX(445px) translateY(-361px)",
                        }}
                      >
                        {" "}
                        <h4>
                          <BsTrash />
                        </h4>{" "}
                      </Button>

                      <Row className="justify-content-center mt-3">
                        <Button variant="warning" type="submit">
                          Complete Edit
                        </Button>
                        <br />
                        <br />
                      </Row>
                      <br />
                      <br />
                    </Form>
                  </Col>
                </Row>
              )}

              <hr />
              <h1>{single_product.product_name}</h1>
              <br />
              <h5>{single_product.price} $</h5>
              <br />

              <Dropdown>
                <OverlayTrigger
                  key="right"
                  placement="right"
                  overlay={
                    <Tooltip id={`tooltip-$'right'`}>
                      Purchases over $50 will receive{" "}
                      <strong>FREE SHIPPING!</strong>
                    </Tooltip>
                  }
                >
                  <Dropdown.Toggle variant="dark">
                    {single_product.price >= 50
                      ? "Free Shipping! - 0$"
                      : "Express Shipping - 5$"}
                  </Dropdown.Toggle>
                </OverlayTrigger>
                <Dropdown.Menu>
                  {single_product.price >= 50 ? (
                    <Dropdown.Item
                      onClick={() => setSelectedOption("Free Shipping! - 0$")}
                    >
                      Free Shipping! - 0$
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item
                      disabled
                      onClick={() => setSelectedOption("Free Shipping! - 0$")}
                    >
                      Free Shipping! - 0$
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item
                    onClick={() => setSelectedOption("Express Shipping - 5$")}
                  >
                    Express Shipping - 5$
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <br />
              <br />

              <Button
                style={{ width: "50%" }}
                variant="dark"
                onClick={() =>
                  dispatch(addProduct({ item: single_product, amount: 1 }))
                }
              >
                Add To Cart
              </Button>
              <br />
              <br />

              <Accordion defaultActiveKey="1">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Product Details</Accordion.Header>
                  <Accordion.Body>{single_product.description}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <br />

              <Accordion defaultActiveKey="1">
                <Accordion.Item eventKey="1"></Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Shipping</Accordion.Header>
                  <Accordion.Body>
                    Delivery services cost $5 each order.
                    <br />
                    However, with an order over $50, delivery services will be
                    FREE!
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Available</Accordion.Header>
                  <Accordion.Body>The item is available.</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>

            <ProductReviews />
          </Row>
        </Container>
        <br />
        <br />
      </div>
    </div>
  );
};
export default Product;
