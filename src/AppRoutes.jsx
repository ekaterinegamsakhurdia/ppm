// AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import ProductForm from "./components/ProductForm";
import ProductDetail from "./pages/ProductDetail";
import TransportationPage from "./components/TransportationPage";
import AppliancesPage from "./components/AppliancesPage";
import OtherPage from "./components/OtherPage";
import CategoryPage from "./pages/CategoryPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<RegistrationForm />} />
      <Route path="/add-product" element={<ProductForm />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/category/transportation" element={<TransportationPage />} />
      <Route path="/category/appliances" element={<AppliancesPage />} />
      <Route path="/category/other" element={<OtherPage />} />
      <Route path="/categories" element={<CategoryPage />} />
    </Routes>
  );
};

export default AppRoutes;
