import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCategoryAsync, selectCategories, postCategoryAsync } from '../category/categorySlice';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsPlusLg } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";
import { HiArrowUp } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { selectCart } from '../cart/cartSlice';
import { selectWishList } from '../wishlist/wishListSlice';
import { searchProductsAsync, selectSearchProduct, updateSearchProduct } from '../product/productSlice';
import { useLocation } from 'react-router-dom';
import { Card } from "react-bootstrap";
import { OverlayTrigger, Dropdown, Image } from 'react-bootstrap';
import { BsTrash } from "react-icons/bs";
import { removeProduct } from "../cart/cartSlice";
import { myServer } from '../../endpoints/endpoints';


const CategoryNavbar = () => {
  const dispatch = useAppDispatch()

  const categories = useAppSelector(selectCategories);
  const myCart = useAppSelector(selectCart);
  const wishList = useAppSelector(selectWishList);
  const search_product = useAppSelector(selectSearchProduct);

  const storedIsStaff = JSON.parse(localStorage.getItem('is_staff'))

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    dispatch(getCategoryAsync());
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 110) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    });
  }, [dispatch]);


  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('category_name', categoryName);

    dispatch(postCategoryAsync(formData));
    setCategoryName('');
  };

  const [showForm, setShowForm] = useState(false)
  const [showForm2, setShowForm2] = useState(false)


  const handleSearch = async (event) => {
    event.preventDefault();
    dispatch(searchProductsAsync({ searchQuery: search_product }));
  };


  const location = useLocation();

  const [showCart, setShowCart] = useState(false);


  return (
    <div>



      <Navbar className={`${!isScrolling ? 'scrolling' : 'fixed-top'}`} style={{ width: "100%", backgroundColor: 'orange' }}>


        <Nav>
          {storedIsStaff ? (<Nav className="me-start">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="orange" onClick={() => setShowForm(!showForm)}>
              <h5>{showForm ? <HiArrowUp /> : <BsPlusLg />}</h5>
            </Button>&nbsp;&nbsp;&nbsp;&nbsp;

            {showForm && (
              <div>&nbsp;
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formCategory" style={{ position: "absolute", transform: " translateX(-20px) translateY(6px) " }}>
                    <Form.Control
                      type="text"
                      placeholder='Category Name'
                      onChange={(event) => setCategoryName(event.target.value)}
                      required
                    />
                  </Form.Group><br />
                  <Button variant="warning" type="submit" style={{ position: "absolute", transform: " translateX(200px) translateY(-18px) " }}>
                    <BsCheckLg />
                  </Button>
                  <br /><br />
                </Form>
              </div>
            )}
          </Nav>) : ("")}
        </Nav>


        {isScrolling ? (

          <Nav.Link style={{ width: "150px", color: "#fe847f", position: "absolute", transform: " translateX(150px) translateY(1px) " }}>
            <h4 onClick={() => setShowForm2(!showForm2)}><GoSearch /></h4>
            {showForm2 && (

              <div style={{ position: "absolute", transform: " translateX(43px) translateY(-39px) " }}>
                <Form onChange={handleSearch}>
                  <Form.Group controlId="formProductName">
                    <Form.Control
                      type="text"
                      onChange={(event) => dispatch(updateSearchProduct(event.target.value))}
                      value={search_product}
                    />
                  </Form.Group>
                </Form>

              </div>)}


          </Nav.Link>) : ("")}





        <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
          {categories.map((category) => (
            <div key={category.id} style={{ margin: "0 20px" }}>
              <Nav>
                <Nav.Link as={Link} to={`/category/category_products/${category.id}/`} className="text-black">
                  <b>{category.category_name}</b>
                </Nav.Link>
              </Nav>
            </div>
          ))}
        </Container>



        <Nav className="me-end">
          {isScrolling ? (
            <Nav className="ml-auto">


              <div onMouseEnter={() => setShowCart(true)} onMouseLeave={() => setShowCart(false)}>
                {myCart.length === 0 ? (

                  <div style={{ color: "#fe847f", position: "absolute", transform: 'translateX(-185px) translateY(-13px)' }}>
                    <Nav.Link as={Link} to="/cart" style={{ color: 'black' }}>
                      {myCart.length > 0 ? (
                        <h4>
                          <FaShoppingCart />
                          <span className="cart-count">{myCart.length}</span>
                        </h4>
                      ) : (
                        <h4>
                          <FaShoppingCart />
                        </h4>
                      )}
                    </Nav.Link>
                  </div>

                ) : (
                  <div>
                    {location.pathname !== '/cart' && location.pathname !== '/order/order_post' ? (
                      <OverlayTrigger
                        trigger={['hover', 'focus']}
                        placement="bottom"
                        show={showCart}
                        delay={{ show: 500, hide: 500 }}

                        overlay={

                          <Container className="p-3">

                            <Card className="card border-0 rounded-0" style={{ width: '23%', position: "absolute", top: 0, right: 140, backgroundColor: "#ecc19c" }}>
                              <Card.Header style={{ backgroundColor: 'orange', color: 'black', textAlign: 'center' }}>SHOPPING CART</Card.Header>
                              <Card.Body style={{ backgroundColor: "white", color: "black" }}>
                                <Dropdown>
                                  {myCart.map((item) => (
                                    <Dropdown.Item key={item.id}>
                                      <div className="d-flex align-items-center">
                                        <Link to={`/single_product/${item.id}`}>
                                          <Image src={myServer + item.picture} width="90" height="90" />
                                        </Link>
                                        <div className="ml-3">

                                          <Card.Text style={{ position: 'absolute', transform: 'translateX(8px) translateY(-45px)' }}>
                                            <strong>
                                              <Link to={`/single_product/${item.id}`} style={{ textDecoration: "none", color: "black", width: "100%" }}>
                                                {item.product_name.length > 17 ? `${item.product_name.substr(0, 17)}...` : item.product_name}
                                              </Link>
                                            </strong>
                                          </Card.Text>
                                          <Card.Text style={{ position: "absolute", transform: "translateX(155px) translateY(-51px)" }}>
                                            <Button variant='none'>
                                              <h6>
                                                <BsTrash style={{ color: "red" }} onClick={() => dispatch(removeProduct({ item: item }))} />
                                              </h6>
                                            </Button>
                                          </Card.Text>
                                          <h6 style={{ position: 'absolute', transform: 'translateX(8px) translateY(-8px)' }}>
                                            $ {item.price}
                                          </h6>
                                          <small><small style={{ position: 'absolute', color: "black", transform: 'translateX(115px) translateY(-9px)' }}>
                                            Amount: {item.amount}
                                          </small></small>
                                          <Card.Text style={{ position: 'absolute', transform: 'translateX(8px) translateY(9px)' }}>
                                            {myCart.reduce((acc, item) => acc + item.price * item.amount, 0) > 50 ? (
                                              <small>Free Shipping - $0!</small>
                                            ) : (
                                              <small>Express Shipping - $5<br /><small style={{ position: 'absolute', transform: 'translateX(-2px) translateY(-5px)' }}>(for the entire order)</small></small>
                                            )}
                                          </Card.Text>

                                        </div>
                                      </div>
                                      <hr />
                                    </Dropdown.Item>
                                  ))}
                                  <Link to="/cart">
                                    <Button variant="none" style={{ width: "60%", position: 'absolute', transform: 'translateX(55px) translateY(-4px)', color: "black", backgroundColor: "#F0EAD6" }}>MY CART</Button>
                                  </Link><div style={{ height: "40px" }} />
                                  <Link to="/order/order_post">
                                    <Button style={{ width: "100%" }} variant="warning">GO TO CHECKOUT</Button>
                                  </Link>
                                </Dropdown>
                              </Card.Body>
                              <Card.Footer style={{ backgroundColor: "#F0EAD6", color: 'color', textAlign: 'center' }}>
                                {myCart.reduce((acc, item) => acc + item.price * item.amount, 0) > 50 ? (
                                  <div>ORDERS OVER $50 DESERVE FREE SHIPPING TO THEIR HOUSE!</div>
                                ) : (
                                  <br />
                                )}
                              </Card.Footer>
                            </Card>
                          </Container>
                        }
                      >
                        <div className="cart-icon" style={{ color: 'black', position: "absolute", transform: 'translateX(-185px) translateY(-13px)' }}>
                          <Nav.Link as={Link} to="/cart" style={{ color: 'black' }}>
                            {myCart.length > 0 ? (
                              <h4>
                                <FaShoppingCart />
                                <span className="cart-count">{myCart.length}</span>
                              </h4>
                            ) : (
                              <h4>
                                <FaShoppingCart />
                              </h4>
                            )}
                          </Nav.Link>
                        </div>
                      </OverlayTrigger>
                    ) : (

                      <div className="cart-icon" style={{ color: 'black', position: "absolute", transform: 'translateX(-185px) translateY(-13px)' }}>
                        <Nav.Link as={Link} to="/cart" style={{ color: 'black' }}>
                          {myCart.length > 0 ? (
                            <h4>
                              <FaShoppingCart />
                              <span className="cart-count">{myCart.length}</span>
                            </h4>
                          ) : (
                            <h4>
                              <FaShoppingCart />
                            </h4>
                          )}
                        </Nav.Link>
                      </div>

                    )}</div>

                )}
              </div>


              &nbsp;&nbsp;&nbsp;
              <Nav.Link as={Link} to="/wishlist" style={{ color: "black", position: "absolute", transform: " translateX(-110px) translateY(-13px) " }}>
                {wishList.length > 0 ? (
                  <h4>
                    {" "}
                    <FaHeart /><span className="wishlist-count">{wishList.length}</span>{" "}
                  </h4>
                ) : (
                  <h4>
                    <FaHeart />
                  </h4>
                )}
              </Nav.Link>
            </Nav>


          ) : ("")}
        </Nav>

      </Navbar>
    </div>
  );
};

export default CategoryNavbar;
