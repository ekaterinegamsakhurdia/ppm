import { useParams } from 'react-router-dom';

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  if (!product) return <p>Product not found 😢</p>;

  return (
    <div>
      <img src={product.image} alt="" />
      <h2>{product.name}</h2>
      <p>{product.price}₾</p>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
    </div>
  );
};

export default ProductDetail;
