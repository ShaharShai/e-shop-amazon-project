import { useEffect, useRef } from "react"
import { Button, Card, Col, ListGroup, PropTypes, Row } from "../../imports"
import Loading from "./Loading"

const PaymentSummary = ({ loading, cart, status, submitOrderHandler, paymentMethod }) => {

    const paypal = useRef();

  useEffect(() => {

    if (status === "submitOrder" && paymentMethod === "PayPal"){
        
     window.paypal.Buttons({
        createOrder: (data, actions, err) => {
            return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        description: "Product",
                        amount: {
                            currency_code: "USD",
                            value: 10.00
                        }
                    }
                ]
            })
        },
        onApprove: async (data, actions) => {
            const order = await (actions.order.capture);
            console.log(order);
        },
        onError: (err) => {
            console.log(err);
        }
     }).render(paypal.current)}
  }, [status, paymentMethod])

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
                status === "submitOrder" &&  paymentMethod === "PayPal" ? (
                    // <Button variant="primary" onClick={submitOrderHandler}>Checkout</Button>
                    <div ref={paypal}></div>
                ) :
                <Button variant="primary" onClick={submitOrderHandler}>Submit</Button>
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