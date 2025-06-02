import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useUser } from "../context/UserProvider";
import axios from "axios";

export const Profile = () => {
  const { id } = useUser();
  const [product, setProducts] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/profile`, { params: { email: id } })
      .then((data) => {
        setProducts(data.data.posts);
        setUserInfo(data.data.user_info);
        console.log(data.data.user_info);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((product) => product.post_id !== id));
  };

  return (
    <div>
      <h2>{userInfo.email}</h2>
      <h2>{userInfo.first_name}</h2>
      <h2>{userInfo.last_name}</h2>
      <h2>{userInfo.phone_number}</h2>
      <h2>My Listings: </h2>
      {product.map((p) => (
        <ProductCard
          key={p.post_id}
          product={p}
          mine={true}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
