import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Row,
  Col,
  ListGroup,
  Items,
  Image,
  Card,
  ListGroupItem,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/apiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalCode}, {''} ,
                {cart.shippingAddress.country},
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <strong>Method:</strong>
              {cart.paymentMethod}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price}= ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Order Sumary </h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
