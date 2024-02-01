import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import HomePage from "./pages/HomePage";
import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";
import SignIn from "./pages/SignIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/SignUp";
import Description from "./pages/Description";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import SubmitOrder from "./pages/SubmitOrder";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allPage min-width">
        <ToastContainer position="bottom-center" limit={1} />
        <Header />
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/products/:token" element={<Description />} />
              <Route path="/reset-password/:token" element={<ResetPassword/>} />
              <Route path="/cart" element={<Cart/>} />
              <Route path="/shipping" element={<Shipping/>} />
              <Route path="/payment" element={<Payment/>} />
              <Route path="/placeorder" element={<SubmitOrder/>} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
