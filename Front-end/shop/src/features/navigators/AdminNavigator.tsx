import { Button, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks';
import { selectSingleProfile } from '../admin_panel/panelSlice';



const AdminNavigator = () => {
    

    const single_profile = useAppSelector(selectSingleProfile)

 
  return (

          <div style = {{ position: "fixed", width: "20%", right: "5%"}}>
            <ListGroup variant="flush">

              <Link to={`/admin_panel/user_details_addresses/${single_profile.user}`} style={{ textDecoration: "none" }}>
                <ListGroup.Item><b>User Addresses</b></ListGroup.Item>
              </Link>

              <Link to={`/admin_panel/user_details_reviews/${single_profile.user}`} style={{ textDecoration: "none" }}>
                <ListGroup.Item><b>User Reviews</b></ListGroup.Item>
              </Link>

              <Link to={`/admin_panel/user_details_orders/${single_profile.user}`} style={{ textDecoration: "none" }}>
                <ListGroup.Item><b>User Orders</b></ListGroup.Item>
              </Link>

              <Link to="/admin_panel/user_details_profiles" style={{ textDecoration: "none" }}>
                <ListGroup.Item>All Profiles</ListGroup.Item>
              </Link>

            <div style = {{height: "10px"}} />
            
            <Link to="/admin_panel/panel_main" style={{ textDecoration: "none", color: "black" }}>
            <Button variant="warning" style = {{width: "100%"}}>
                <b>BACK TO MENU</b>
            </Button>
            </Link>

            </ListGroup>
          </div>
  )
}



export default AdminNavigator
