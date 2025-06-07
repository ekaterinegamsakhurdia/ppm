import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserProvider";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isMyPost, setIsMyPost] = useState(false);
  const [previousOrders, setPreviousOrders] = useState([]);
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const [rentalStart, setRentalStart] = useState(new Date());
  const [rentalDurationHours, setRentalDurationHours] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const { id: user_email } = useUser();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/post/${id}`, {
        headers: { Authorization: user_email },
      })
      .then((data) => {
        setProduct(data.data.post);
        setIsMyPost(data.data.isMyPost);
        setPreviousOrders(data.data.previousOrders);
        setUpcomingOrders(data.data.upcomingOrders);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function addOrder(e) {
    e.preventDefault();
    if (!+rentalDurationHours || +rentalDurationHours < 0) {
      setErrorMessage("invalid duration");
      return;
    }

    if (!new Date(rentalStart)) {
      setErrorMessage("invalid start date");
      return;
    }

    const body = {
      post_id: id,
      rental_start: rentalStart,
      rental_duration_hours: rentalDurationHours,
    };
    axios
      .post(`http://localhost:3000/orders`, body, {
        headers: { Authorization: user_email },
      })
      .then((data) => {
        // post_id, rental_start, rental_duration_hours
        const totalCost = data.data.post.calculated_price;
        setErrorMessage(`Order added: total cost:  ${totalCost}`);
        setRentalDurationHours(0);
      })
      .catch((err) => console.log(err));
  }

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

      {isMyPost && (
        <>
          <h1>Upcoming</h1>
          {upcomingOrders.map((order) => (
            <>
              <p>Booked by {order.user_email} </p>
              <p>Start time: {order.rental_start}</p>
              <p>End time: {order.calculated_end_time}</p>
              <p>Duration: {order.rental_duration_hours}</p>
              <p>Price: {order.calculated_price}</p>
            </>
          ))}
          <h1>Previous</h1>
          {previousOrders.map((order) => (
            <>
              <p>Booked by {order.user_email} </p>
              <p>Start time: {order.rental_start}</p>
              <p>End time: {order.calculated_end_time}</p>
              <p>Duration: {order.rental_duration_hours}</p>
              <p>Price: {order.calculated_price}</p>
            </>
          ))}
        </>
      )}

      {!isMyPost && (
        <>
          <form onSubmit={(e) => addOrder(e)}>
            <label className="input-label">KIU Email:</label>
            <input
              type="datetime-local"
              name="startTime"
              className="input-field"
              value={rentalStart}
              onChange={(e) => setRentalStart(e.target.value)}
            />

            <input
              type="int"
              name="duration"
              min={0}
              className="input-field"
              value={rentalDurationHours}
              onChange={(e) => setRentalDurationHours(e.target.value)}
            />

            <button type="submit">Add order</button>
          </form>
          {errorMessage}
        </>
      )}
    </div>
  );
};

export default ProductDetail;
