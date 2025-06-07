import { Link } from "react-router-dom";
import axios from "axios";
import "./ProductCard.css";

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
    <div className="productcard">
    <Link className="linktotheproduct" to={`/product/${product.post_id}`}>
    <div className="productcardinside">
      <div  className="image"> 
        <img src="https://cdn.thegreatprojects.com/thegreatprojects/images/c/c/c/d/9/cccd9ab3a8832417497e233c1cb92b9e.jpg?width=364&height=364&format=jpg" alt="" width="200px" />
      </div>
      {/* {product.photo && (
        <img
          src="https://cdn.thegreatprojects.com/thegreatprojects/images/c/c/c/d/9/cccd9ab3a8832417497e233c1cb92b9e.jpg?width=364&height=364&format=jpg"
          alt="product"
          width="100"
        />
      )} */}
      <div classname="productinfo">
        <h3 className="productname" >{product.product_name} </h3>
        <p className="productprice">{product.product_price}₾ </p>
        <p className="productpricetext"> an hour</p>
        <p className="productdescription">{product.product_description}</p>
        {mine && (
              <Link className="linktotheproduct" to="/profile">
          <button onClick={deleteProduct} className="DeleteButton">Delete </button>
          </Link>
        )}
      </div>
      </div>
    </Link>
    </div>
  );
};

export default ProductCard;
