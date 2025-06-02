import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const CategoryPage = ({ products }) => {
  const { type } = useParams();

  const [product, setProducts] = useState([]);

  useEffect(() => {
    const mapCategoryName = (type) => {
      switch (type) {
        case "transportation":
          return "Transportation";
        case "appliances":
          return "Home Appliances";
        case "other":
          return "Other";
        default:
          return "Unknown Category";
      }
    };

    axios
      .get(`http://localhost:3000/posts/${mapCategoryName(type)}`)
      .then((data) => {
        console.log(data);
        setProducts(data.data.posts);
      })
      .catch((err) => console.log(err));
  }, [type]);

  return (
    <div>
      <h2>{type} Listings</h2>
      {product.map((p) => (
        <ProductCard key={p.post_id} product={p} />
      ))}
    </div>
  );
};

export default CategoryPage;
