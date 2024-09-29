import { Button, Card, Col } from "react-bootstrap";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OrderSummary() {
  // const { cart } = useContext(CartContext);
  const cart = useSelector((state) => state.cart.cart); // Access the cart array directly

  // const { user } = useAuth();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  function handleClick() {
    navigate("/checkout");
  }

  const subtotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const shippingEstimate = 5.0;
  const taxEstimate = subtotal * 0.08; // Assuming 8% tax
  const total = subtotal + shippingEstimate + taxEstimate;
  return (
    <Col md={4}>
      <Card className="p-3">
        <h4>Order summary</h4>
        <div className="d-flex justify-content-between my-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between my-2">
          <span>Shipping estimate</span>
          <span>${shippingEstimate.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between my-2">
          <span>Tax estimate</span>
          <span>${taxEstimate.toFixed(2)}</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between my-2">
          <strong>Order total</strong>
          <strong>${total.toFixed(2)}</strong>
        </div>
        {cart.length === 0 || !user ? (
          <Button variant="primary" block className="mt-3" disabled>
            Checkout
          </Button>
        ) : (
          <Button
            variant="primary"
            block
            className="mt-3"
            onClick={handleClick}
          >
            Checkout
          </Button>
        )}
      </Card>
    </Col>
  );
}

export default OrderSummary;
