import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../components/Navbar';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.87);
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
`;

const Section = styled.section`
  margin-bottom: 2rem;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #614b34;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: 1px solid #baa78c;
  border-radius: 6px;
  font-size: 1rem;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem;
  background: #c49a6c;
  color: #fff;
  border: none;
  border-radius: 6px;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.2s;
  &:hover {
    background: #614b34;
  }

  &.submit {
    width: 10rem;
  }
`;

const SummaryBox = styled.div`
  background: #f7f3ee;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const Checkout = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    card: '',
    expiry: '',
    cvc: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const { cartItems, clearCart } = useCart();
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  return (
    <Wrapper>
      <Title>Checkout</Title>
      {submitted ? (
        <Section>
          <h3>Thank you for your purchase!</h3>
          <p>Your order has been received and is being processed.</p>
          <br></br>
          <Button as={Link} to="/">Return to Home</Button>
        </Section>
      ) : (
        <form onSubmit={handleSubmit}>
          <SummaryBox>
            <h4>Order Summary</h4>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span>{item.name} x {item.quantity}</span>
                    <span>£{((item.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #baa78c' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
              </>
            )}
          </SummaryBox>

          <Section>
            <h4>Shipping Information</h4>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </Section>

          <Section>
            <h4>Payment Details</h4>
            <Label htmlFor="card">Card Number</Label>
            <Input
              id="card"
              type="text"
              name="card"
              value={form.card}
              onChange={handleChange}
              required
              maxLength={16}
              pattern="\d{16}"
              placeholder="1234 5678 9012 3456"
            />
            <Row>
              <div style={{ flex: 1 }}>
                <Label htmlFor="expiry">Expiry</Label>
                <Input
                  id="expiry"
                  type="text"
                  name="expiry"
                  value={form.expiry}
                  onChange={handleChange}
                  required
                  placeholder="MM/YY"
                  pattern="\d{2}/\d{2}"
                  maxLength={5}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  type="text"
                  name="cvc"
                  value={form.cvc}
                  onChange={handleChange}
                  required
                  maxLength={4}
                  pattern="\d{3,4}"
                  placeholder="123"
                />
              </div>
            </Row>
          </Section>
          <Button type="submit" disabled={cartItems.length === 0}>Pay Now</Button>
        </form>
      )}
    </Wrapper>
  );
};

export default Checkout;