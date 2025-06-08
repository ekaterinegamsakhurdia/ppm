import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./ListingPage.css";
import { useUser } from "../context/UserProvider";

const CategoryPage = ({ products }) => {
  const { type } = useParams();

  const {BASEURL} = useUser();
  
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
      .get(`${BASEURL}/posts/${mapCategoryName(type)}`)
      .then((data) => {
        console.log("FETCHED", data);
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
