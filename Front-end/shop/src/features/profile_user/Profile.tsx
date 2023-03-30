import { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../authentication/authenticationSlice";
import { getProfileAsync } from "./profileSlice";
import { BsFillPencilFill } from "react-icons/bs";
import ProfileNavigator from "../navigators/ProfileNavigator";
import { myServer } from "../../endpoints/endpoints";



const Profile = () => {
    const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const username = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(getProfileAsync());
  }, [dispatch]);

  const { first_name, last_name, location, bio, picture } = useAppSelector((state) => state.profile);
  


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
        <Row>
          <Col md={9}>
            <br />
            <br />
            <h2>PROFILE</h2>
            <br />
            <br />
            <h5>YOUR PROFILE</h5>
            { isScrolling ? (<div style = {{position: "absolute", top: 299}}><ProfileNavigator /></div>) : (<div style = {{position: "absolute"}}><ProfileNavigator /></div>) }
            <div style={{position: "absolute", transform: " translateX(805px) translateY(-25px) "}}>USERNAME: <b>{username}</b></div>
            <Card style = {{ width: "970px", height: "250px", position: "absolute", transform: " translateX(0px) translateY(0px) "}}>
                <Card.Body>
                    <Row style = {{display: "flex", alignItems: "center", height: "100%"}}>
                    <Col md={4}>
                    {picture ? (<img alt="mypicture" height = {200} width = {200} src = {myServer + picture}/>) : ("UNKNOWN")}
                    </Col>
                    <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item><b>USERNAME:</b> {username}</ListGroup.Item>
                        <ListGroup.Item><b>FIRST NAME:</b> {first_name? (`${first_name}`) : ("UNKNOWN")}</ListGroup.Item>

                        <ListGroup.Item><b>LAST NAME:</b> {last_name? (`${last_name}`) : ("UNKNOWN")}</ListGroup.Item>
                        <ListGroup.Item><b>LOCATION:</b> {location? (`${location}`) : ("UNKNOWN")}</ListGroup.Item>
                    </ListGroup>
                        </Col>
                        <Col md={4}>
                        <ListGroup variant="flush">
                        <ListGroup.Item><b>BIO:</b><hr/>
                        {bio? (`${bio}`) : ("UNKNOWN")}</ListGroup.Item>
                        
                    </ListGroup>
                    
                        </Col>
                    </Row>
                </Card.Body>
            </Card><br/>
            <Button
              onClick={() => navigate("/profile/profile_update")}
              variant="warning"
              style = {{ position: "absolute", transform: " translateX(912px) translateY(-13px) "}}
            >
             <h6> <BsFillPencilFill /> </h6>
            </Button>
          </Col>


        </Row>
        
      </Container>
    <div style = {{height: "470px"}}/>
    </div>
  );
};

export default Profile;
