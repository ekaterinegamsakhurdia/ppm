import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.image} alt="product" width="100" />
    <div>
      <h3>{product.name}</h3>
      <p>{product.price}₾</p>
      <p>{product.description}</p>
      <Link to={`/product/${product.id}`}>See more</Link>
    </div>
  </div>
);

export default ProductCard;
