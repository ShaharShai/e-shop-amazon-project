import { Button, Card, Col, ListGroup, PropTypes, Row } from "../../imports"
import Loading from "./Loading"

const PaymentSummary = ({ loading, cart, status, submitOrderHandler }) => {
  return (
    <>
    <Card>
        <Card.Header>
            <Card.Title>
               Payment Summary
            </Card.Title>
        </Card.Header>
        <Card.Body>
            <ListGroup>
                <ListGroup.Item>
                    <Row>
                        <Col>Items: </Col>
                        <Col>${cart.itemsPrice.toFixed(2)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping: </Col>
                        <Col>${cart.shippingPrice.toFixed(2)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Tax: </Col>
                        <Col>${cart.taxPrice.toFixed(2)} </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Total: </Col>
                        <Col><strong> ${cart.itemsPrice.toFixed(2)} </strong> </Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
            {
                status === "submitOrder" && <Button variant="primary" onClick={submitOrderHandler}>Submit</Button>
            }
            {loading && <Loading />}
        </Card.Body>
    </Card>
    </>
  )
}

PaymentSummary.PropTypes = {
    loading: PropTypes.bool,
    cart: PropTypes.object,
    status: PropTypes.string,
    submitOrderHandler: PropTypes.func, 
}

export default PaymentSummary