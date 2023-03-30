import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Table, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllReviewsAsync, selectReviews } from "./panelSlice";
import AdminNavigator from "../navigators/AdminNavigator";
import { Review } from "../../models/Reviews";
import { deleteReviewAsync } from "../reviews/reviewsSlice";
import NavUserProfile from "./NavUserProfile";
import { myServer } from "../../endpoints/endpoints";

const PanelReviews = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const reviews = useAppSelector(selectReviews);

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getAllReviewsAsync(id));
    }
  }, [id, dispatch]);

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
        <h2>REVIEWS</h2>
        <div style={{ height: "100px" }} />
        <h5>USER REVIEWS</h5>
        <NavUserProfile />
        <br />
        <Row>
          {isScrolling ? (
            <div style={{ position: "absolute", top: 380 }}>
              <AdminNavigator />
            </div>
          ) : (
            <div style={{ position: "absolute" }}>
              <AdminNavigator />
            </div>
          )}

          <Col xs={9}>
            <Table striped bordered hover>
              <thead>
                <tr style={{ backgroundColor: "#5A5A5A", color: "white" }}>
                  <th style={{ textAlign: "center" }}>Review ID</th>
                  <th style={{ textAlign: "center" }}>Picture</th>
                  <th style={{ textAlign: "center" }}>Product ID</th>
                  <th style={{ textAlign: "center" }}>Rating</th>
                  <th style={{ textAlign: "center" }}>Username</th>
                  <th style={{ textAlign: "center" }}>Comment</th>
                  <th style={{ textAlign: "center" }}></th>
                </tr>
              </thead>
              {reviews.length === 0 ? (
                <Alert
                  variant="info"
                  style={{ position: "absolute", width: "965px" }}
                >
                  <Alert.Heading>USER HAS NO REVIEWS YET!</Alert.Heading>
                  <b>The requested user has not posted any reviews.</b>
                </Alert>
              ) : (
                ""
              )}
              <tbody>
                {[...reviews].reverse().map((review: Review) => (
                  <tr key={review.id} style={{ backgroundColor: "white" }}>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {review.id}
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <Image
                        src={myServer + review.picture}
                        alt="review"
                        height={100}
                        width={120}
                      />
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {review.product}
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {review.rating} &#9733;
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {review.name}
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {review.comment}
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <button
                        style={{
                          color: "blue",
                          border: "none",
                          background: "none",
                          padding: 0,
                        }}
                        onClick={() =>
                          navigate(
                            `/admin_panel/user_details_update_review/${review.id}`
                          )
                        }
                      >
                        Edit
                      </button>{" "}
                      |{" "}
                      <a
                        style={{ color: "red", textDecoration: "none" }}
                        href=""
                        onClick={() =>
                          review.id && dispatch(deleteReviewAsync(review.id))
                        }
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <div style={{ height: "350px" }} />
      </Container>
    </div>
  );
};

export default PanelReviews;
