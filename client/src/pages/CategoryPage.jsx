import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./ListingPage.css";

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
        setProducts(data.data.posts);
      })
      .catch((err) => console.log(err));
  }, [type]);

  return (
    <div className="productpage">
      <h2 className="type"> {type} Listings</h2>
      <div className="products">
        {product.map((p) => (
          <ProductCard key={p.post_id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
