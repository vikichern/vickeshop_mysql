import { useEffect, useRef, useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { deleteReviewAsync, getReviewsProductAsync, selectProductReviews } from './reviewsSlice';
import { BsTrash } from "react-icons/bs";
import { selectSingleProduct } from '../product/productSlice';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { myServer } from '../../endpoints/endpoints';



const Reviews = () => {
    const product_reviews = useAppSelector(selectProductReviews)
    const single_product = useAppSelector(selectSingleProduct)


    const { id } = useParams()

    const dispatch = useAppDispatch()

    const storedIsStaff = JSON.parse(localStorage.getItem('is_staff') as string)


    useEffect(() => {
        if (id !== undefined) {
        dispatch(getReviewsProductAsync(Number(id)))
        }
    }, [id, dispatch])


    
      const [sum, setSum] = useState<number>(0);
        const [count, setCount] = useState<number>(0);

useEffect(() => {
  if (product_reviews.length) {
    const total = product_reviews.reduce((acc, review) => acc + review.rating, 0);
    setSum(total);
    setCount(product_reviews.length);
  }
}, [product_reviews]);

const average = count ? sum / count : 0;

const [showModal, setShowModal] = useState(false);
const handleClose = () => setShowModal(false);
const handleShow = () => setShowModal(true);



const observer = useRef<IntersectionObserver | null>(null);
const myDivRef = useRef<HTMLDivElement>(null);

const [offset, setOffset] = useState(0);
const [limit, setLimit] = useState(6);

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
        setLimit(limit + 6);
        setShowSpinner(false)
      }, 300);
    }
  });
  
  if (myDivRef.current) {
    observer.current.observe(myDivRef.current);
  }
}, [myDivRef, limit]);

    

    return (
        
        <div>

        
        <div className='text-left'>
            
            <br /><br /><br /><br /><br /><br />
            <h3>REVIEWS</h3><br /><br />
            <h4 style = {{display: 'flex', justifyContent: 'center'}}>Average rating: {average.toFixed(1)} &#9733;</h4>
            <hr/><br/>


        {product_reviews.slice(0, offset + limit).map((review) => (
            <div key={review.id}>
                <Card style={{ height: '240px', width: "80%"}}>
                <Card.Title style={{ position: 'absolute', transform: ' translateX(15px) translateY(10px) ' }}>
                    <b>RATING: </b>{review.rating.toFixed(1)} &#9733;
                </Card.Title>
                <Card.Body style={{ position: 'absolute', transform: ' translateX(0px) translateY(30px) ' }}>
                    {review.name}:
                </Card.Body>
                <Card.Body style={{ position: 'absolute', transform: ' translateX(0px) translateY(50px) ' }}>
                    {review.comment}
                </Card.Body>
                <Card.Body style={{ position: 'absolute', transform: ' translateX(730px) translateY(6px) ' }}>
                    {review.picture && <img height = {200} width = {230} alt = 'mypic' src={myServer + review.picture} />}
                </Card.Body>
                <Card.Body style={{ position: 'absolute', bottom: -4, left: -18, transform: 'translateX(15px)' }}>

                {storedIsStaff && (<Button variant="danger" onClick = {handleShow}> <h4><BsTrash /> </h4></Button>)}
                <Modal show={showModal} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title><BsTrash /> Delete Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {review.name}'s review?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Link to = {`/single_product/${single_product.id}`}>
                  <Button variant="danger" onClick = {() => review.id && dispatch(deleteReviewAsync(review.id))}>
                    Delete
                  </Button>
                  </Link>
                </Modal.Footer>
              </Modal>
                

                </Card.Body>
                </Card><br />
            </div>
        ))}
    </div>

    {product_reviews.length >= offset + limit && (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25vh' }}>
    {showSpinner &&
        <Stack>
        <CircularProgress color="warning" />
      </Stack>}
  </div>
)}
<div ref={myDivRef} />
</div>
    )
}

export default Reviews