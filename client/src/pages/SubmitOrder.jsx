import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import { getError } from "../utils";
import { toast } from "react-toastify";
import Title from "../components/shared/Title";
import { Col, Row, axios } from "../imports";
import OrderSummary from "../components/shared/OrderSummary";
import CheckoutSteps from "../components/shared/CheckoutSteps";
import PaymentSummary from "../components/shared/PaymentSummary";
import { CLEAR_CART } from "../actions";

const SubmitOrder = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, []);

  const submitOrderHandler = async () => {
    try {
      setLoading(true);
      const orderData = {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      };
      const { data } = await axios.post("/api/v1/orders", orderData, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      ctxDispatch({ type: CLEAR_CART })
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  cart.taxPrice = round2(cart.itemsPrice * 0.17);
  cart.shippingPrice =
    cart.itemsPrice > 50
      ? round2(cart.itemsPrice * 0.1)
      : round2(cart.itemsPrice * 0.02);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  return (
    <div>
      <Title title="Order Summary" />
      <CheckoutSteps step1 step2 step3 step4 />
      <h1 className="my-3">Order Summary</h1>

      <Row>
        <Col>
          <OrderSummary
            cart={cart}
            status={"submitOrder"}
            isDelivered={false}
          />
        </Col>
        <Col>
          <PaymentSummary
            loading={loading}
            submitOrderHandler={submitOrderHandler}
            status={"submitOrder"}
            cart={cart}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SubmitOrder;
