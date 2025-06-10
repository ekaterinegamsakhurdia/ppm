import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserProvider";
import "./ProductDetail.css";
import PaypalCheckout from "../components/PaypalCheckout";
// import PaypalCheckout from "src/components/PaypalCheckout"; // Import the PayPal component

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isMyPost, setIsMyPost] = useState(false);
  const [previousOrders, setPreviousOrders] = useState([]);
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const [rentalStart, setRentalStart] = useState(new Date());
  const [rentalDurationHours, setRentalDurationHours] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalCost, setTotalCost] = useState(null); // Add state for total cost
  const [showPaypal, setShowPaypal] = useState(false); // Add state to control PayPal display
  const { id: user_email, BASEURL } = useUser();
  const [orderId, serOrderId] = useState(null)

  useEffect(() => {
    axios
      .get(`${BASEURL}/post/${id}`, {
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
      .post(`${BASEURL}/orders`, body, {
        headers: { Authorization: user_email },
      })
      .then((data) => {
        const total = data.data.post.calculated_price;
        setTotalCost(total);
        setErrorMessage(`Order ready for payment. Total cost: ${total}₾`);
        setShowPaypal(true); // Show PayPal buttons
        serOrderId(data.data.post.order_id)
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response?.data?.error || "Error creating order");
      });
  }

  function deleteOrder() {
    if (!orderId) return
    axios.delete(`${BASEURL}/orders/${orderId}`)
  }


  const handlePaymentSuccess = (details) => {
    // This will be called when PayPal payment is successful
    console.log("Payment successful:", details);
    setErrorMessage("Payment successful! Your order is confirmed.");
    setShowPaypal(false);
    // You might want to refresh the orders here
  };

  

  if (!product) return <p>Product not found 😢</p>;

  return (
    <div>
      <div className="productfullinfo">
          {(
            <div className="publisherinfo">
              <h2>Additional info:</h2>
              <p className="bookingtext">
                After you book the item, please contact the owner to specify pick-up location and other details on the following email or phone number:
              </p>
              <p><h4>Email Address:</h4> {product.email}</p>
              <p><h4>Phone Number: </h4> {product.phone_number}</p>
              <p><h4>First Name: </h4>{product.first_name}</p>
              <p><h4>Last Name: </h4>{product.last_name}</p>
            </div>
          )}

        {isMyPost && (
          <>
            {upcomingOrders.length > 0 && (
              <div className="upcoming">
                <fieldset className="orderboxupcomigandold">
                  <legend>Upcoming</legend>
                  {upcomingOrders.map((order) => (
                    <div className="upcomingorder">
                      <p><h4>Booked by: </h4>{order.user_email}</p>
                      <p><h4>Start time: </h4>{order.rental_start}</p>
                      <p><h4>End time: </h4>{order.calculated_end_time}</p>
                      <p><h4>Duration: </h4>{order.rental_duration_hours} hours</p>
                      <p><h4>Price: </h4>{order.calculated_price}</p>
                    </div>
                  ))}
                </fieldset>
              </div>
            )}

          </>
        )}

        {!isMyPost && (
          <fieldset className="orderbox">
            <legend>Order now</legend>
            {!showPaypal ? (
              <form onSubmit={(e) => addOrder(e)}>
                <div className="ordering">
                  <label className="input-label">Pick up date and time</label>
                  <input
                    type="datetime-local"
                    name="startTime"
                    className="input-field"
                    value={rentalStart}
                    onChange={(e) => setRentalStart(e.target.value)}
                  />
                  <label className="input-label">Rental duration in hours</label>
                  <input
                    type="number"
                    name="duration"
                    min={0}
                    className="input-field"
                    value={rentalDurationHours}
                    onChange={(e) => setRentalDurationHours(e.target.value)}
                  />
                  <button type="submit" className="submit-button">
                    Calculate Total
                  </button>
                </div>
              </form>
            ) : (
              <div className="paypal-container">
                <h4>Total to pay: {totalCost}₾</h4>
                <PaypalCheckout 
                  price={totalCost} 
                  onSuccess={handlePaymentSuccess}
                />
                <button 
                  onClick={() => {setShowPaypal(false); deleteOrder()}}
                  className="cancel-button"
                >
                  Cancel Payment
                </button>
              </div>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </fieldset>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;