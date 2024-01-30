import { useContext } from "react";
import { Store } from "../Store";
import Title from "../components/shared/Title";
import { Col, Row, axios, toast } from "../import";
import ItemsInCart from "../components/CartPage/ItemsInCart";
import Checkout from "../components/CartPage/Checkout";
import { ADD_PRODUCT, REMOVE_FROM_CART } from "../actions";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  const navigate = useNavigate();

  const updateCartHandler = async (item, quantity) => {
    try {
      const { data } = await axios.get(`/api/v1/products/${item._id}`);

      if (data.countInStock < quantity) {
        alert("Sorry, Product is out of stock");
        return;
      }
      ctxDispatch({ type: ADD_PRODUCT, payload: { ...item, quantity } });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const removeCartItemHandler = async (item) => {
    ctxDispatch({ type: REMOVE_FROM_CART, payload: { item } });

  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping")
  }

  return (
    <div>
      <Title title="ShoppingCart" />
      <Row>
        <Col md={8}>
          <ItemsInCart
            cartItems={cartItems}
            updateCartHandler={updateCartHandler}
            removeCartItemHandler={removeCartItemHandler}
          />
        </Col>
        <Col md={4}>
          <Checkout cartItems={cartItems} checkoutHandler={checkoutHandler}/>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
