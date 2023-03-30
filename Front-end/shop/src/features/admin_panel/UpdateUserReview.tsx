import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getSingleReviewAsync, patchUserReviewAsync, selectSingleUserReview } from "./panelSlice";
import { Rating } from '@mui/material';
import AdminNavigator from "../navigators/AdminNavigator";



const UpdateUserReview = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const single_review = useAppSelector(selectSingleUserReview);

  const [name, setName] = useState<string>("");
  const [rating, setRating] = useState<number | undefined>(0);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (rating) {
      formData.append("name", name);
      formData.append("rating", rating.toString());
      formData.append("comment", comment);
    }
    
    dispatch(
      patchUserReviewAsync({ reviewData: formData, id: single_review.id })
    );
      navigate(`/admin_panel/user_details_reviews/${single_review.user}`);
  };


  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSingleReviewAsync(id));
    }
  }, [id, dispatch]);
  


  return (
    <div>
      <Container>
        <br />
        <br />
        <h2>EDIT REVIEW</h2>
        <div style = {{height: "100px"}}/>
        <h5>REVIEW DETAILS</h5>
        <br/>
        <div style = {{position: "absolute", top: 380}}><AdminNavigator /></div>
        <Row className="justify-content-left mt-3">
          <Col md={7}>
          <Form onSubmit={handleSubmit} style={{ width: "43%" }}><br/>
            <div style={{ position: "absolute", transform: " translateX(0px) translateY(-30px) " }}>
              
            <b>Rating:</b>
            <Rating
              style={{ position: "absolute", transform: " translateX(10px) translateY(-2px) " }}
              value={rating}
              name="half-rating"
              defaultValue={2.5}
              precision={0.5}
              onChange={(e) => setRating(+((e.target as HTMLInputElement).value))}
            />
            </div>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => setComment(event.target.value)}
                required
              />
            </Form.Group>
            <br />
            <Button variant="warning" type="submit" style={{ width: "150px", position: "absolute", transform: " translateX(80px)"}}>
              SUBMIT REVIEW
            </Button>
            
          </Form>
          <Button
                  onClick={() => {
                    navigate(`/admin_panel/user_details_reviews/${single_review.user}/`);
                  }}
                    variant="secondary"
                    style={{ width: "100px", position: "absolute", transform: " translateX(103px) translateY(50px) "}}
                  >
                    CANCLE
                  </Button>
          </Col>
        </Row>
      </Container>
              
      <div style = {{height: "134px"}}/>
    </div>
  );
};



export default UpdateUserReview;
