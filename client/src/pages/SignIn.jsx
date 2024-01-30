import { useContext, useState } from "react";
import axios from "axios";
import { Button, Container, Form, Link, toast } from "../import.js";
import Title from "../components/shared/Title.jsx";
import { getError, sendEmail } from "../utils.js";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store.jsx";
import { SIGN_IN } from "../actions.js";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { dispatch: ctxDispatch } = useContext(Store);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/v1/users/signin`, {
        email,
        password,
      });
      ctxDispatch({ type: SIGN_IN, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
      toast.success(`Welcome ${data.name} !`);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const resetButtonHandler = async () => {
    if (email) {
      try {
        const { data } = await axios.post(`/api/v1/reset/request-reset`, { email });
        toast.success(data.message);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      toast.error("Please enter your email !");
    }
  };

  return (
    <Container className="small-container">
      <Title title="SignIn Page" />
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            type="password"
          ></Form.Control>
        </Form.Group>
        <div className="mb-3">
          <Button className="mb-3" type="submit">
            Sign In
          </Button>
        </div>
        <div className="mb-3">
          New customer ? <Link to="/signup">Create your account</Link>
        </div>
        <div className="mb-3">
          Forgot your password ?{" "}
          <Link
            onClick={resetButtonHandler}
          >
            Reset your password
          </Link>
        </div>
      </Form>
    </Container>
  );
}

export default SignIn;
