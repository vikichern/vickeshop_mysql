import { Alert, Button, Container, Figure } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { initwishList, removeWish, selectWishList } from './wishListSlice'
import { BsFillSuitHeartFill } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { myServer } from '../../endpoints/endpoints';



const WishList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    
    const wishList = useAppSelector(selectWishList)

    useEffect(() => {
        dispatch(initwishList());
    }, [dispatch]);

    const observer = useRef<IntersectionObserver | null>(null);
    const myDivRef = useRef<HTMLDivElement>(null);
  
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(12);
  
    const [showSpinner, setShowSpinner] = useState(false)
  

    
    useEffect(() => {
      if (observer.current) {
        observer.current.disconnect();
      }
      
      observer.current = new IntersectionObserver(entries => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          setShowSpinner(true);
          setTimeout(() => {
            setLimit(limit + 12);
            setShowSpinner(false)
          }, 300);
        }
      });
      
      if (myDivRef.current) {
        observer.current.observe(myDivRef.current);
      }
    }, [myDivRef, limit]);

  return (
    <div><br/><br/>
    <Container><br/><br/>
    
    <h1 style = {{display: 'flex', justifyContent: 'center'}}><BsFillSuitHeartFill/><br/></h1>
    <h1 style = {{display: 'flex', justifyContent: 'center'}}>MY LIST</h1><br/><br/><br/>

    
    <div>
  
    {
      wishList.length === 0
        ? <Alert variant="info" className="d-none d-lg-block">
            <Alert.Heading>Your wishlist seems to be empty. </Alert.Heading>
            <b>In order to have items in your wishlist, you are welcome to browse the site and look for the products you are interested in.</b>
          </Alert>
        : wishList.length === 1
          ? <div>YOU HAVE ONLY 1 PRODUCT IN YOUR LIST</div>
          : `TOTAL OF ${wishList.length} ITEMS IN YOUR LIST`
    }
    </div><br/>

      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: "20px" }}>
    {wishList.slice(0, offset + limit).map((product) =>
    <div key = {product.id}>
    <Figure>
    <button style = {{border: "none", background: "none", padding: 0}} onClick = {() => navigate("/single_product/" + product.id)}>
    <Figure.Image
      width={280}
      height={310}
      alt="180x280"
      src={myServer + product.picture}
    /></button>
    <Figure.Caption>
    {product.product_name}<br/>
    <b>{product.price} $</b>
    </Figure.Caption>
    <div style={{ position: "absolute", transform: "translateX(250px) translateY(-32px)" }}>
    <Button variant='none'>
     <h5>
      <BsTrash onClick={() => dispatch(removeWish({ item: product }))} />
    </h5>
    </Button>
</div>
  </Figure>

    </div>)}</div>
    
    <div  style = {{height: "300px"}} />


    {wishList.length >= offset + limit && (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25vh' }}>
    {showSpinner &&
    <Box sx={{ width: '100%' }}>
    <LinearProgress color="warning"/>
  </Box>
    }
  </div>
)}
<div ref={myDivRef} />

  </Container></div>
)
}

export default WishList