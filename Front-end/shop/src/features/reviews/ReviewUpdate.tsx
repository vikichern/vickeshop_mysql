import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Rating } from '@mui/material';
import { patchReviewAsync } from "./reviewsSlice";
import { getSingleReviewAsync, selectSingleUserReview } from "../admin_panel/panelSlice";
import ProfileNavigator from "../navigators/ProfileNavigator";



const ReviewUpdate = () => {
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
    
    dispatch(patchReviewAsync({ reviewData: formData, id: Number(single_review.id) }));
      navigate(`/reviews/reviews_user`);
  };


  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSingleReviewAsync(id));
    }
  }, [id, dispatch]);




  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
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
            <h2>YOUR REVIEWS</h2>
            <br />
            <br />
            <h5>REVIEW DETAILS</h5>
            { isScrolling ? (<div style = {{position: "absolute", top: 299}}><ProfileNavigator /></div>) : (<div style = {{position: "absolute"}}><ProfileNavigator /></div>) }
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
            <Button variant="warning" type="submit" style={{ width: "150px", position: "absolute", transform: " translateX(77px) translateY(0px) "}}>
              SUBMIT REVIEW
            </Button>
            
          </Form>
          <Button
                  onClick={() => {
                    navigate(`/reviews/reviews_user`);
                  }}
                    variant="secondary"
                    style={{ width: "100px", position: "absolute", transform: " translateX(103px) translateY(50px) "}}
                  >
                    CANCLE
                  </Button>
          </Col>
        </Row>
      </Container>
      
      

      
      <div style = {{height: "334px"}}/>
    
    </div>
  );
};



export default ReviewUpdate;
