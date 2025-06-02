import React from 'react';
import Header from './Header';
import ProductCard from './ProductCard';
import './ProductList.css';

const AppliancesPage = ({ products }) => (
  <div>
    <Header title="Transportation" subtitle="Rent or list your rides — from bikes to scooters!" />
    <div className="product-grid">
      {products.map((p, idx) => (
        <ProductCard key={idx} title={p.title} imageUrl={p.imageUrl} />
      ))}
    </div>
  </div>
);

export default AppliancesPage;
