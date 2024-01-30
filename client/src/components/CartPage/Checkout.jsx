import React from "react";
import { Button, Card, ListGroup, PropTypes } from "../../import";

function Checkout({ cartItems, checkoutHandler }) {
  return (
    <Card>
      <ListGroup>
        <ListGroup.Item>
          <h3>
            Subtotal: {cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
            {cartItems.length === 1 ? "Item: " : "Items: "}
            {" $"}{" "}
            {cartItems.reduce((a, c) => a + c.quantity * c.price, 0).toFixed(2)}
          </h3>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="d-grid">
            <Button
              disabled={cartItems.length === 0}
              type="button"
              variant="primary"
              onClick={() => checkoutHandler()}
            >
              Checkout
            </Button>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

Checkout.propTypes = {
  cartItems: PropTypes.array,
  checkoutHandler: PropTypes.func
};

export default Checkout;
