import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Rating from "../shared/Rating";
import { useContext } from "react";
import { Store } from "../../Store";

function Product({ product }) {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cartItem } = state.cart;
  
  const addToCartHandler = () => {
    
  }

  return (
    <Card className="product-card mb-4">
        <Link to={`/products/${product.token}`}>
            <Card.Img variant='top' src={product.image} alt="title"/>
        </Link>
        <Card.Body className="card-body">
            <Link to={`/products/${product.token}`}>
                <Card.Title className="product-title font-size-">
                    {product.title}
                </Card.Title>
            </Link>
            <Rating rating={product.rating.rate} numReviews={product.rating.count}/> 
            <Card.Text>{ product.price }$</Card.Text>
            { product.countInStock === 0 ? <Button variant="light" disabled>Out of Stock</Button> :
            <Button className="btn-primary" onClick={() => addToCartHandler(product, cartItem, ctxDispatch)}>Add to Cart</Button>
            }
        </Card.Body>
    </Card>
  )
}

Product.propTypes = { 
    product: PropTypes.object
}

export default Product