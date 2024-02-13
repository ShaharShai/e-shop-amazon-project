import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { StoreProvider } from "./Store.jsx";


axios.defaults.baseURL = "http://localhost:5000";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StoreProvider>
  // </React.StrictMode>
);
