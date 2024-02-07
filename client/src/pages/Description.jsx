import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store";
import descriptionPageReducer from "../Reducers/descriptionPageReducer.js";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../actions";
import { addToCartHandler, getError } from "../utils";
import axios from "axios";
import Loading from "../components/shared/Loading.jsx";
import MessageBox from "../components/shared/MessageBox.jsx";
import { Col, Row } from "../imports.js";
import ProductDescription from "../components/DescriptionPage/ProductDescription.jsx";
import Title from "../components/shared/Title.jsx";
import CartDescription from "../components/DescriptionPage/CartDescription.jsx";

const initialState = { loading: true, error: "", data: [] };

function Description() {
  const [{ loading, error, data }, dispatch] = useReducer(
    descriptionPageReducer,
    initialState
  );

  const URL = "http://localhost:5000";
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const { data } = await axios.get(
          `${URL}/api/v1/products/token/${token}`
        );

        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (err) {
        dispatch({ type: GET_FAIL, payload: getError(err) });
      }
    };

    getProduct();
  }, [token]);

  const addToCart = async () => {
    await addToCartHandler(data, cartItems, ctxDispatch);
    navigate("/cart");
  };

  return (
    <div>
      <Title title={data.token} />    
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant={"danger"}>{error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img src={data.image} width={400} alt={data.title} />
            </Col>
            <Col md={3}>
              <ProductDescription {...data} />
            </Col>
            <Col md={3}>
              <CartDescription product={data} addToCart={addToCart} />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default Description;
