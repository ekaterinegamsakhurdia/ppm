// AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import ProductForm from "./components/ProductForm";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import MainLayout from "./components/MainLayout";
import { Profile } from "./components/Profile";
import ErrorPage from "./components/ErrorPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<RegistrationForm />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products/:type" element={<CategoryPage />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
