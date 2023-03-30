import { useEffect, useState } from 'react';
import { Alert, Button, Card, Container, Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteReviewUserAsync, getReviewsUserAsync, selectUserReviews } from './reviewsSlice';
import { BsTrash } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { BsFillPencilFill } from "react-icons/bs";
import ProfileNavigator from '../navigators/ProfileNavigator';
import { myServer } from '../../endpoints/endpoints';



const UserReviews = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


  const user_reviews = useAppSelector(selectUserReviews);

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);



  useEffect(() => {
    dispatch(getReviewsUserAsync());
  }, [dispatch]);



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
      <h2>REVIEWS</h2>
      <br />
      <br />
      <h5>YOUR RATINGS <BsStarFill/></h5>
      { isScrolling ? (<div style = {{position: "absolute", top: 299}}><ProfileNavigator /></div>) : (<div style = {{position: "absolute"}}><ProfileNavigator /></div>) }
<div style = {{width: "75%"}}>
  {user_reviews.length === 0 ? (
    <Alert variant="info" className="d-none d-lg-block">
      <Alert.Heading>You haven't posted any reviews yet. </Alert.Heading>
      <b>You are welcome to browse the site and leave reviews for the products you've purchased.</b>
    </Alert>
  ) : (
    <p>You have posted {user_reviews.length} reviews</p>
  )}
</div>



{[...user_reviews].reverse().map((review) => (
          <div key={review.id}>
            <Card style={{ height: '240px', width: "74.5%"}}>
              <Card.Title style={{ position: 'absolute', transform: ' translateX(15px) translateY(10px) ' }}>
                <b>RATING: </b>{review.rating.toFixed(1)} &#9733;
              </Card.Title>
              <Card.Body style={{ position: 'absolute', transform: ' translateX(0px) translateY(30px) ' }}>
                {review.name}:
              </Card.Body>
              <Card.Body style={{ position: 'absolute', transform: ' translateX(0px) translateY(60px) ' }}>
                {review.comment}
              </Card.Body>
              <Card.Body style={{ position: 'absolute', transform: ' translateX(685px) translateY(6px) ' }}>
                {review.picture && <img height = {200} width = {230} alt = "reviewPicture" src={myServer + review.picture} />}
              </Card.Body>
              <Card.Body style={{ position: 'absolute', bottom: -4, left: -18, transform: 'translateX(15px)' }}>
                <Button variant="danger" onClick={handleShow}>
                  <h4><BsTrash /></h4>
                </Button>
                <Button variant="warning" style = {{position: "absolute", transform: ' translateX(570px)'}}
                onClick = {() => navigate(`/reviews/review_update/${review.id}/`)}>
                  <h4><BsFillPencilFill /></h4>
                </Button>
                <Modal show={showModal} onHide={handleClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title><BsTrash /> Delete Warning</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure you want to delete your review?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="danger" onClick={() => review.id && dispatch(deleteReviewUserAsync(review.id))}>
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Card.Body>
            </Card><br />
          </div>
        ))}

   </Container>
  <div style = {{height: "400px"}} />
</div>
  );
};

export default UserReviews;
