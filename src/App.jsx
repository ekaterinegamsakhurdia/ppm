// App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Header from "./components/Header";
import ProductForm from "./components/ProductForm";

function App() {
  return (
    // <Router>
    //   <Header />
    //   <AppRoutes />
    // </Router>
    <ProductForm></ProductForm>
  );
}

export default App;
