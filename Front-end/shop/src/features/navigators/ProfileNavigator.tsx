import { Button, ListGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks';
import { logoutAsync, reset } from '../authentication/authenticationSlice';



const ProfileNavigator = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
    

    const onLogout = () => {
      dispatch(logoutAsync());
      dispatch(reset());
      navigate("/");
    };
 
  return (

          <div style = {{ position: "fixed", width: "20%", right: "5%"}}>
            <ListGroup variant="flush">
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <ListGroup.Item><b>My profile</b></ListGroup.Item>
              </Link>

              <Link to="/shipping" style={{ textDecoration: "none" }}>
                <ListGroup.Item><b>Shipping addresses</b></ListGroup.Item>
              </Link>

              <Link to="/reviews/reviews_user" style={{ textDecoration: "none" }}>
                <ListGroup.Item><b>Reviews</b></ListGroup.Item>
              </Link>

              <Link to="/order/orders_user" style={{ textDecoration: "none" }}>
                <ListGroup.Item><b>Recent orders</b></ListGroup.Item>
              </Link>
              
                <ListGroup.Item style={{ textDecoration: "none" }}><Button variant = "none" onClick={() => onLogout()} >Logout</Button></ListGroup.Item><br/>
            </ListGroup>
          </div>
  )
}



export default ProfileNavigator
