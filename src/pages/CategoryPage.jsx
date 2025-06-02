import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';

const CategoryPage = ({ products }) => {
  const { type } = useParams();
  const filtered = products.filter(p => p.category.toLowerCase() === type.toLowerCase());

  return (
    <div>
      <h2>{type} Listings</h2>
      {filtered.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
};

export default CategoryPage;
