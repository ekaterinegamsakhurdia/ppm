import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  console.log(id);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/post/${id}`)
      .then((data) => {
        console.log(data);
        console.log(data.data.post);
        setProduct(data.data.post);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <p>Product not found 😢</p>;

  return (
    <div>
      <img src={product.photo} alt="" />
      <h2>{product.product_name}</h2>
      <p>{product.product_price}₾</p>
      <p>{product.product_description}</p>
      <p>Category: {product.product_type}</p>

      <div>
        <h1>Publisher info</h1>
        <p>{product.email}</p>
        <p>{product.first_name}</p>
        <p>{product.last_name}</p>
        <p>{product.phone_number}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
