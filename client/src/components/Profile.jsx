import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useUser } from "../context/UserProvider";
import axios from "axios";
import "./Profile.css"
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
    <div className="profilepage">
      <div className="myinfoboxwithicon">  
       <div>
          <img
                    className="profileicon"
                    src="./public/user.png"
                    width="100"
                    height="100"
                  />
       </div>

        <div className="myinfobox">
          <div className="myinforow"> <h3>Name - </h3> <p className="myinfo"> {userInfo.first_name}</p></div>
          <div className="myinforow"> <h3>Last name - </h3> <p className="myinfo">{userInfo.last_name}</p></div>
          <div className="myinforow"> <h3>Phone number - </h3> <p className="myinfo">{userInfo.phone_number}</p></div>
          <div className="myinforow"> <h3>Email address - </h3> <p className="myinfo">{userInfo.email }</p></div>
        </div>
      </div>
      <div>
        
      <fieldset className="mylistingsbox">
      <legend className="mylistings">My Listings</legend>
      {
        product.length == 0 && <h3 className="ifempty">You have no products listed for rent</h3>
      }
      <div className="products">
      {product.map((p) => (
        <ProductCard
          key={p.post_id}
          product={p}
          mine={true}
          onDelete={handleDelete}
        />
      ))}
      </div>
      </fieldset>
      </div>
      
    </div>
  );
};
