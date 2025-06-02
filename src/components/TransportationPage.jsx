import React from 'react';

const TransportationPage = ({ products }) => {
  return (
    <div>
      <h2>Transportation</h2>
      {products.length === 0 ? (
        <p>No products yet 😥</p>
      ) : (
        <div className="product-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <img src={product.imageUrl} alt={product.title} />
              <h4>{product.title}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransportationPage;
