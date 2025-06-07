import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalCheckout = ({ price }) => (
  <PayPalScriptProvider options={{ "client-id": "AXGnvOn0NHBwDngAktjDH3lsbtFYniIiDZ8i3vo_u4NpeUO8mVOhiWFk8eD0rvBlhFwDXNMCNEWQx9TJ" }}>
    <PayPalButtons
      style={{ layout: "vertical" }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{ amount: { value: `${price}` } }],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          console.log("Payment successful:", details);
        });
      }}
    />
  </PayPalScriptProvider>
);


export default PaypalCheckout;