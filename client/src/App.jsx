// App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Header from "./components/Header";
import ProductForm from "./components/ProductForm";
import UserProvider from "./context/UserProvider";

function App() {
  return (
    <UserProvider>
      <Router>
        {/* <Header /> */}
        <AppRoutes />
      </Router>
      {/* <ProductForm></ProductForm> */}
    </UserProvider>
  );
}

export default App;
