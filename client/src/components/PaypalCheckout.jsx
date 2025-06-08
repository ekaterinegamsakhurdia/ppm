import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalCheckout = ({ price, onSuccess }) => (
  <PayPalScriptProvider 
    options={{ 
      "client-id": "AXGnvOn0NHBwDngAktjDH3lsbtFYniIiDZ8i3vo_u4NpeUO8mVOhiWFk8eD0rvBlhFwDXNMCNEWQx9TJ",
      "currency": "USD" // Add currency if needed
    }}
  >
    <PayPalButtons
      style={{ layout: "vertical" }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: { 
              value: price,
              currency_code: "USD" // Match your currency
            }
          }],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          onSuccess(details); // Call the success handler
        });
      }}
      onError={(err) => {
        console.error("PayPal error:", err);
        // You might want to handle errors here
      }}
    />
  </PayPalScriptProvider>
);

export default PaypalCheckout;