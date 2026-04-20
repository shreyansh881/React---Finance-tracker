import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FinanceProvider } from "./context/FinanceContext";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter basename="/React---Finance-tracker/">
    <FinanceProvider>
      <App />
      <ToastContainer />
    </FinanceProvider>
  </BrowserRouter>
);