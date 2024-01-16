import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Container  from "react-bootstrap/Container";
import HomePage from "./pages/HomePage";
import Footer from "./components/shared/Footer";

function App() {
  return ( 
    <BrowserRouter>
      <div className="d-flex flex-column side-allPage min-width">
        {/* <Header/> */}
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Container>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
