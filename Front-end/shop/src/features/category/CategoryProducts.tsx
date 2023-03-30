import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Figure,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Carrousel from "../navigators/Carrousel";
import { postProductAsync } from "../product/productSlice";
import {
  deleteCategoryAsync,
  getCategoryProductsAsync,
  getSingleCategoryAsync,
  patchCategoryAsync,
  selectCategory,
  selectCategoryProducts,
} from "./categorySlice";
import { BsTrash } from "react-icons/bs";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";
import { HiArrowRight } from "react-icons/hi";
import { BsFillPencilFill } from "react-icons/bs";
import { addWish, removeWish, selectWishList } from "../wishlist/wishListSlice";
import { myServer } from "../../endpoints/endpoints";

const CategoryProducts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const categoryProducts = useAppSelector(selectCategoryProducts);
  const single_category = useAppSelector(selectCategory);
  const wishlist = useAppSelector(selectWishList);
  const storedIsStaff = JSON.parse(localStorage.getItem("is_staff") as string);

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getCategoryProductsAsync(id));
      dispatch(getSingleCategoryAsync(id));
    }
  }, [id]);

  const singleCategory = useAppSelector(selectCategory);

  const [category, setCategory] = useState<string>(singleCategory.id);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [picture, setPicture] = useState<any>(null);

  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);

  const handleSubmit = async () => {
    navigate(`/category/category_products/${singleCategory.id}/`);

    const formData = new FormData();
    formData.append("category", singleCategory.id.toString());
    formData.append("product_name", productName);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("picture", picture);

    dispatch(postProductAsync(formData));
    setCategory(singleCategory.id);
    setProductName("");
    setDescription("");
    setPrice(0);
    setPicture("");
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPicture(event.target.files ? event.target.files[0] : undefined);
  };

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [categoryName, setCategoryName] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("category_name", categoryName);

    dispatch(
      patchCategoryAsync({ categoryData: formData, id: single_category.id })
    );
    setCategoryName("");
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };

  const observer = useRef<IntersectionObserver | null>(null);
  const myDivRef = useRef<HTMLDivElement>(null);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(12);

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
          setLimit(limit + 12);
          setShowSpinner(false);
        }, 300);
      }
    });

    if (myDivRef.current) {
      observer.current.observe(myDivRef.current);
    }
  }, [myDivRef, limit]);

  return (
    <div>
      <br />
      <br />
      <Carrousel />
      <Container>
        <br />
        <br />

        <h1 style={{ display: "flex", justifyContent: "center" }}>
          {singleCategory.category_name}
        </h1>
        <br />
        <br />
        <br />
        <br />
        <br />

        {storedIsStaff ? (
          <div>
            <Button
              variant="warning"
              onClick={() => setShowForm2(!showForm2)}
              style={{
                position: "absolute",
                transform: " translateX(1250px) translateY(-4px) ",
              }}
            >
              <h5>{showForm2 ? <HiArrowRight /> : <BsFillPencilFill />}</h5>
            </Button>

            {showForm2 && (
              <div>
                <Form onSubmit={onSubmit}>
                  <Form.Group
                    controlId="formCategory"
                    style={{
                      position: "absolute",
                      transform: " translateX(1020px) translateY(1px) ",
                    }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="Category Name"
                      onChange={(event) => setCategoryName(event.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button
                    variant="warning"
                    type="submit"
                    style={{
                      position: "absolute",
                      transform: " translateX(965px) translateY(1px) ",
                    }}
                  >
                    <BsCheckLg />
                  </Button>
                </Form>

                <Button
                  onClick={handleShow}
                  variant="danger"
                  style={{
                    position: "absolute",
                    transform: " translateX(870px) translateY(-6px) ",
                  }}
                >
                  {" "}
                  <h4>
                    <BsTrash />
                  </h4>{" "}
                </Button>
                <Modal show={showModal} onHide={handleClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <BsTrash /> Delete Warning{" "}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to delete "
                    {singleCategory.category_name}"?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Link to="/">
                      <Button
                        variant="danger"
                        onClick={() =>
                          singleCategory.id &&
                          dispatch(deleteCategoryAsync(singleCategory.id))
                        }
                      >
                        Delete
                      </Button>
                    </Link>
                  </Modal.Footer>
                </Modal>
              </div>
            )}

            <div>
              <Button variant="warning" onClick={() => setShowForm(!showForm)}>
                Add Product
              </Button>
              <br />
              <br />
              <hr />
              <br />
              {showForm && (
                <Row className="justify-content-center mt-3">
                  <Col md={7}>
                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
                      <Row className="justify-content-center align-items-center mt-3">
                        <Col md={6}>
                          <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Group controlId="formCategory">
                              <Form.Control
                                type="text"
                                onChange={(event) =>
                                  setCategory(event.target.value)
                                }
                                value={singleCategory.category_name}
                                required
                              />
                            </Form.Group>
                          </Form.Group>
                          <Form.Group controlId="formProductName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                              type="text"
                              onChange={(event) =>
                                setProductName(event.target.value)
                              }
                              value={productName}
                              required
                            />
                          </Form.Group>
                          <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              type="text"
                              onChange={(event) =>
                                setDescription(event.target.value)
                              }
                              value={description}
                              required
                            />
                          </Form.Group>
                          <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                              type="number"
                              onChange={(event) =>
                                setPrice(Number(event.target.value))
                              }
                              value={price}
                              required
                            />
                          </Form.Group>
                          <Form.Group controlId="formPicture">
                            <Form.Label>Picture</Form.Label>
                            <Form.Control
                              type="file"
                              onChange={handlePictureChange}
                            />
                          </Form.Group>
                          <br />
                        </Col>
                      </Row>

                      <Row className="justify-content-center mt-3">
                        <Button variant="warning" type="submit">
                          Create New Product
                        </Button>
                        <br />
                        <br />
                      </Row>
                      <br />
                      <br />
                      <hr />
                    </Form>
                  </Col>
                </Row>
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridGap: "20px",
          }}
        >
          {categoryProducts.slice(0, offset + limit).map((product) => (
            <div key={product.id}>
              <Figure>
                <button
                  style={{ border: "none", background: "none", padding: 0 }}
                  onClick={() => navigate("/single_product/" + product.id)}
                >
                  <Figure.Image
                    width={250}
                    height={280}
                    alt="180x280"
                    src={myServer + product.picture}
                  />
                </button>
                <Figure.Caption>
                  {product.product_name}
                  <br />
                  <b>$ {product.price}</b>
                </Figure.Caption>
                <div
                  style={{
                    position: "absolute",
                    transform: "translateX(220px) translateY(-32px)",
                  }}
                >
                  <button
                    type="button"
                    style={{ border: "none", backgroundColor: "transparent" }}
                  >
                    <h5>
                      {wishlist.find(
                        (item) => String(item.id) === String(product.id)
                      ) ? (
                      <FaHeart
                        style={{ color: "orange" }}
                        onClick={() => 
                          dispatch(addWish({ item: product }))
                        }
                      />
                      ) : (
                        <FaRegHeart
                          onClick={() => dispatch(addWish({ item: product }))}
                        />
                      )}
                    </h5>
                  </button>
                </div>
              </Figure>
            </div>
          ))}
        </div>
        <br />
        <br />

        {categoryProducts.length >= offset + limit && (
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
      </Container>
      <br />
      <br />
    </div>
  );
};

export default CategoryProducts;
