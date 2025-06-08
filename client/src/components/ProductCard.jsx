import { Link } from "react-router-dom";
import axios from "axios";
import "./ProductCard.css";
import { useUser } from "../context/UserProvider";

const ProductCard = ({ product, mine = false, onDelete, order = null }) => {
  console.log(order);
  const {BASEURL} = useUser();

  function deleteProduct() {
    axios
      .delete(`${BASEURL}/posts/${product.post_id}`)
      .then((_) => onDelete(product.post_id))
      .catch((e) => console.log(e));
  }

  return (
    <div className="productcard">
      <Link className="linktotheproduct" to={`/product/${product.post_id}`}>
        <div className="productcardinside">
          <div className="image">
            <img
              src={product?.image_url}
              alt=""
              width="200px"
            />
        <p >{product.product_description}</p>
          </div>
          {/* {product.photo && (
        <img
          src="https://cdn.thegreatprojects.com/thegreatprojects/images/c/c/c/d/9/cccd9ab3a8832417497e233c1cb92b9e.jpg?width=364&height=364&format=jpg"
          alt="product"
          width="100"
        />
      )} */}
          <div classname="productinfo">
            <h3 className="productname">{product.product_name} </h3>
            <p className="productprice">{product.product_price}₾ </p>
            <p className="productpricetext"> an hour</p>
            {order && (
              <>
                <p>{`Start date: ${new Date(
                  order.rental_start
                ).toLocaleString()}`}</p>
                <p>{order.rental_duration_hours} hours</p>
                <p>Total cost: {order.calculated_price}</p>
              </>
            )}
            {mine && 
            <Link to="./">
            <button className="DeleteButton" onClick={deleteProduct}>Delete </button>
            </Link>
            }
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;