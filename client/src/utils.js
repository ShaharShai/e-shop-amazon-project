// import emailjs from "@emailjs/browser";
import axios from "axios";
import { ADD_PRODUCT } from "./actions";
// import {smtp} from "smtpjs";

const URL = "http://localhost:5000";

const getError = (err) => {
  return err.message && err.response.data.message
    ? err.response.data.message
    : err.message;
};

const serviceID = "service_0vs7pe5";
const templateID = "template_9gn2ias";
const publicKey = "o76Q438Kjx0uR6bvW";
const smtpKey = "7CDE4D0C3F4C24806BD0E5C1C14941249573";
const smtpToken = "0e6a51ba-d771-446b-a42b-8295b30044ad";

const sendEmail = () => {
  Email.send({
    SecureToken: smtpToken,
    To: "shahars839@gmail.com",
    From: "music.chai.chai@gmail.com",
    Subject: "This is the subject",
    Body: "And this is the body",
  }).then((message) => alert(message));
};

const addToCartHandler = async (product, cartItems, ctxDispatch) => {

  const existingItem = cartItems.find((item) => item._id === product._id);

  const quantity = existingItem ? existingItem.quantity + 1 : 1;

  try {
    const {data} = await axios.get(
      `${URL}/api/v1/products/${product._id}`
    );
  
    if (data.countInStock < quantity) {
      alert("Sorry, Product is out of stock");
      return;
    }
    ctxDispatch({ type: ADD_PRODUCT, payload: { ...product, quantity } });
  } catch (error) {
    console.log(error.message);
  }

};

const resetPassword = () => {
  
}

export { getError, sendEmail, addToCartHandler };
