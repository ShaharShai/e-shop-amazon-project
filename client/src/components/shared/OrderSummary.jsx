import { Card, Col, Link, ListGroup, PropTypes, Row } from "../../imports";
import MessageBox from "./MessageBox";

const OrderSummary = ({ cart, status, isDelivered }) => {
  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title>Shipping Address</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Name: </strong>
            {cart.shippingAddress.fullName} <br />
            <strong>Address: </strong>
            {cart.shippingAddress.address} <br />
            <strong>City: </strong>
            {cart.shippingAddress.city} <br />
            <strong>Postal Code: </strong>
            {cart.shippingAddress.postalCode} <br />
            <strong>Country: </strong>
            {cart.shippingAddress.country}
          </Card.Text>
          {
            status === "submitOrder" ? 
            <Link to={`/shipping`}>Edit</Link> :
            isDelivered ? 
            <MessageBox variant={"success"}>Delivered</MessageBox>
            :  <MessageBox variant={"danger"}>Not delivered</MessageBox>
            
          }
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header>
          <Card.Title>Payment Method</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Method:</strong>
            {cart.paymentMethod}
          </Card.Text>
          
          {status === "submitOrder" ? (
            <Link to="/payment">Edit</Link>
          ) : status === "details-unpaid" ? (
            <MessageBox variant="danger">Not Paid</MessageBox>
          ) : (
            <MessageBox variant="success">Paid</MessageBox>
          )}
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header>
          <Card.Title>Items</Card.Title>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {cart.cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={5}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid rounded img-thumbnail"
                    />
                  </Col>

                  <Col md={3}>
                    {" "}
                    <Link to={`/products/${item.token}`}>{item.title}</Link>
                  </Col>
                  <Col md={2}>
                    {" "}
                    <span>{item.quantity}</span>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          {
            status === "submitOrder" && <Link to={`/cart`}>Edit</Link>
          }
       
        </Card.Body>
      </Card>
    </>
  );
};

OrderSummary.propTypes = { cart: PropTypes.object, status: PropTypes.string, isDelivered: PropTypes.bool };

export default OrderSummary;
