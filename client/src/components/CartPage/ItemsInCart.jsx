import { Button, Col, Link, ListGroup, PropTypes, Row } from "../../imports.js";
import MessageBox from "../shared/MessageBox.jsx";

function ItemsInCart({ cartItems, updateCartHandler, removeCartItemHandler }) {
  return (
    <div>
      {cartItems.length === 0 ? (
        <MessageBox>
          Your Cart is Empty. <Link to="/">Go Back to Home Page</Link>
        </MessageBox>
      ) : (
        <ListGroup>
          {cartItems.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row>
                <Col md={8}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid rounded img-thumbnail"
                  />
                  <Link to={`/products/${item.token}`}>{item.title}</Link>
                </Col>
                <Col md={2}>
                  <Button
                    onClick={() => updateCartHandler(item, item.quantity - 1)}
                    disabled={item.quantity === 1}
                    variant="light"
                    name="minusButton"
                  >
                    {" "}
                    <i className="fa fa-minus-circle"></i>
                  </Button>{" "}
                  <span>{item.quantity}</span>{" "}
                  <Button
                    onClick={() => updateCartHandler(item, item.quantity + 1)}
                    variant="light"
                    name="plusButton"
                  >
                    {" "}
                    <i className="fa fa-plus-circle"></i>
                  </Button>
                </Col>
                <Col md={1}>${item.price}</Col>
                <Col md={1}>
                  <Button
                    variant="light"
                    onClick={() => removeCartItemHandler(item)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

ItemsInCart.propTypes = {
  cartItems: PropTypes.array,
  updateCartHandler: PropTypes.func,
  removeCartItemHandler: PropTypes.func,
};

export default ItemsInCart;
