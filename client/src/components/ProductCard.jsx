import { Link } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ product, mine = false, onDelete }) => {
  console.log(product);

  function deleteProduct() {
    axios
      .delete(`http://localhost:3000/posts/${product.post_id}`)
      .then((_) => onDelete(product.post_id))
      .catch((e) => console.log(e));
  }

  console.log(`data:image/jpeg;base64,${product.photo}`);
  console.log(product.photo);

  return (
    <div className="product-card">
      {product.photo && (
        <img
          src={`data:image/jpeg;base64,${product.photo}`}
          alt="product"
          width="100"
        />
      )}
      <div>
        <h3>{product.product_name}</h3>
        <p>{product.product_price}₾</p>
        <p>{product.product_description}</p>
        {mine ? (
          <button onClick={deleteProduct}>Delete </button>
        ) : (
          <Link to={`/product/${product.post_id}`}>See more</Link>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
