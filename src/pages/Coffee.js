import React, { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useCart } from "../components/Navbar";
import espressoImg from "../media/images/coffee/espresso.png";
import latteImg from "../media/images/coffee/latte.png";
import cappuccinoImg from "../media/images/coffee/cappuccino.png";
import mochaImg from "../media/images/coffee/mocha.png";
import flatWhiteImg from "../media/images/coffee/flat-white.png";
import americanoImg from "../media/images/coffee/americano.png";
import macchiatoImg from "../media/images/coffee/macchiato.png";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  z-index: 0;
`;

/* Single grid container (no nested grid) */
const Grid = styled.div`
  display: grid;
  /* fixed-size tracks; don’t stretch */
  grid-template-columns: repeat(auto-fit, minmax(12rem, 12rem));
  gap: 3rem;

  justify-content: center;

  max-width: calc(5 * 12rem + 4 * 3rem);
  width: fit-content;
  margin: 0 auto;

  padding: 0.8rem;
  text-align: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 10px 8px 18px rgba(0, 0, 0, 0.87);
  backdrop-filter: blur(15px);
  color: rgba(40, 49, 44, 1);
`;


const Card = styled(motion.div)`
  background: #a8a2967e;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
`;

const CoffeeImage = styled.img`
  width: 5rem;
  height: 4rem;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
`;

const CoffeeName = styled.h2`
  font-size: 1.2rem;
  color: #614b34;
  margin-bottom: 0.3rem;
`;

const Price = styled.p`
  font-size: 1.2rem;
  color: #c49a6c;
  margin-bottom: 1rem;
`;

const QuantityWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const QuantityButton = styled.button`
  background: #614b34;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: #c49a6c;
  }
`;

const QuantityDisplay = styled.span`
  font-size: 1.2rem;
  color: #4e4539;
`;

const AddToCartButton = styled(motion.button)`
  background: #c49a6c;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:not(:disabled):hover {
    background: #614b34;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    background: #a59072;
  }
`;

/* Products */
const coffeeProducts = [
  { id: 1, name: "Espresso", price: 3.50, image: espressoImg },
  { id: 2, name: "Latte", price: 4.50, image: latteImg },
  { id: 3, name: "Cappuccino", price: 4.00, image: cappuccinoImg },
  { id: 4, name: "Mocha", price: 5.00, image: mochaImg },
  { id: 5, name: "Flat White", price: 4.80, image: flatWhiteImg },
  { id: 6, name: "Americano", price: 3.00, image: americanoImg },
  { id: 7, name: "Macchiato", price: 3.80, image: macchiatoImg },
];

const CoffeeProductsPage = () => {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});

  const increaseQty = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => {
      const next = Math.max((prev[id] || 0) - 1, 0);
      return { ...prev, [id]: next };
    });
  };

  const [shakeId, setShakeId] = useState(null);

  const handleAddToCart = (product) => {
  const qty = quantities[product.id] ?? 0;
  if (qty <= 0) {
    toast.error("Please select a quantity first ☕");
    // trigger shake on this product's button
    setShakeId(product.id);
    setTimeout(() => setShakeId(null), 350);
    return;
  }
  addToCart(product, qty);
  toast.success(`${qty} × ${product.name} added to cart ✅`);
};

  return (
    <Container>
      <Grid>
        {coffeeProducts.map((coffee) => {
          const qty = quantities[coffee.id] ?? 0;
          return (
            <Card
              key={coffee.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <CoffeeImage src={coffee.image} alt={coffee.name} />
              <CoffeeName>{coffee.name}</CoffeeName>
              <Price>£{coffee.price.toFixed(2)}</Price>

              <QuantityWrapper>
                <QuantityButton onClick={() => decreaseQty(coffee.id)}>-</QuantityButton>
                <QuantityDisplay>{qty}</QuantityDisplay>
                <QuantityButton onClick={() => increaseQty(coffee.id)}>+</QuantityButton>
              </QuantityWrapper>

              <AddToCartButton
                type="button"
                onClick={() => handleAddToCart(coffee)}
                aria-disabled={qty === 0}
                title={qty === 0 ? "Set quantity above 0 to add" : "Add to cart"}
                // shake animation when this card was errored
                animate={shakeId === coffee.id ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
                transition={{ duration: 0.95 }}
              >
                Add to Cart
              </AddToCartButton>
            </Card>
          );
        })}
      </Grid>
    </Container>
  );
};

export default CoffeeProductsPage;
