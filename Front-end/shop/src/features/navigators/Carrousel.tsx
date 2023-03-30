import { Carousel } from 'react-bootstrap'



const Carrousel = () => {
  return (
    <div><br/>
    <Carousel variant="white">
      <Carousel.Item>
        <img style={{width: "100%"}}
          className="d-block w-10"
          src={require('../../images/interior1.webp')}
          alt="First slide"
          height="400"
        />
        <Carousel.Caption>
          <h2>FREE SHIPPING</h2>
          <h5>FREE SHIPPING AND FAST EXPRESS DELIVERY FOR ORDERS OVER $50</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img style={{width: "100%"}}
          className="d-block w-10"
          src={require('../../images/interior2.webp')}
          alt="Second slide"
          height="400"
        />
        <Carousel.Caption>
          <h2>OUR PRODUCTS</h2>
          <h5>WE TAKE PRIDE IN PROVIDING HIGH-QUALITY PRODUCTS AT AFFORDABLE PRICES</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img style={{width: "100%"}}
          className="d-block w-10"
          src={require('../../images/interior3.webp')}
          alt="Third slide"
          height="400"
        />
        <Carousel.Caption>
          <h2>CONTACT US</h2>
          <h5>
            YOU ARE WELCOME TO CONTACT US. DETAILS ARE AT THE BOTTOM OF THE PAGE
          </h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default Carrousel