import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useCart } from "../components/Navbar";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  z-index: 0;
  margin-top: 2rem;
`;

const Homebox = styled.div`
  width: 40%;
  padding: 1.5rem;
  text-align: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 10px 8px 18px rgba(0, 0, 0, 0.87);
  backdrop-filter: blur(15px);
  color: rgba(40, 49, 44, 1);
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 1.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.3rem;
  text-align: left;
`;

const CategoryTitle = styled.div`
  font-weight: bold;
  margin: 1rem 0 0.5rem 0;
  font-size: 1.1rem;
  color: #614b34;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-bottom: 1rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.6rem;
  border-radius: 6px;
  border: 1px solid #baa78c;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background: #c49a6c;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.2s;
  &:hover {
    background: #614b34;
  }
`;

const SuccessMsg = styled.div`
  margin-top: 1.5rem;
  color: #614b34;
  font-weight: bold;
`;

const coffeeOptions = [
  { id: "dark", label: "Bean & Brew's Dark Roast Blend", price: 9 },
  { id: "traditional", label: "Bean & Brew's Traditional Blend", price: 11 },
  { id: "arabica", label: "Bean & Brew's Arabica Blend", price: 10 },
];

const bakedGoodsOptions = [
  { id: 1, label: "All Butter Croissant",   price: 3.50 },
  { id: 2, label: "Almond Croissant",      price: 4.50 },
  { id: 3, label: "Chocolate Croissant", price: 4.00 },
  { id: 4, label: "Pain au Chocolat",      price: 5.00 },
  { id: 5, label: "Sweet Bun with Custard", price: 4.80 },
  { id: 6, label: "Cronut",  price: 3.00 },
  { id: 7, label: "Chocolate Twist",  price: 3.80 },
];

const CustomHamperPage = () => {
  const { addToCart } = useCart();
  const [selectedCoffee, setSelectedCoffee] = useState("");
  const [selectedBaked, setSelectedBaked] = useState([]);
  const [hamperName, setHamperName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(false);

  const handleCoffeeChange = (e) => setSelectedCoffee(e.target.value);

  const handleBakedChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedBaked((prev) => [...prev, value]);
    } else {
      setSelectedBaked((prev) => prev.filter((id) => id !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hamperName || !selectedCoffee || selectedBaked.length === 0) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Hamper added to cart!");
    const coffeeDetail = coffeeOptions.find((opt) => opt.id === selectedCoffee);
    const bakedDetails = bakedGoodsOptions.filter((opt) => selectedBaked.includes(opt.id.toString()));
    const price =
      (coffeeDetail?.price || 0) +
      bakedDetails.reduce((sum, item) => sum + (item.price || 0), 0);

    const hamperProduct = {
      id: Date.now(),
      name: hamperName || "Custom Hamper",
      items: `${coffeeDetail?.label || ""}, ${bakedDetails.map((i) => i.label).join(", ")}`,
      price,
      quantity,
      image: null,
    };

    addToCart(hamperProduct, quantity);

    setSelectedCoffee("");
    setSelectedBaked([]);
    setHamperName("");
    setQuantity(1);
    setSuccess(true);

    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <Container>
      <Homebox>
        <Title>Custom Hamper</Title>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="hamperName">Hamper Name</Label>
          <Input
            id="hamperName"
            type="text"
            value={hamperName}
            onChange={(e) => setHamperName(e.target.value)}
            placeholder="e.g. Birthday Gift"
          />

          <CategoryTitle>Coffee Beans</CategoryTitle>
          <RadioGroup>
            {coffeeOptions.map((opt) => (
              <RadioLabel key={opt.id}>
                <input
                  type="radio"
                  name="coffee"
                  value={opt.id}
                  checked={selectedCoffee === opt.id}
                  onChange={handleCoffeeChange}
                />
                {opt.label} (£{opt.price})
              </RadioLabel>
            ))}
          </RadioGroup>

          <CategoryTitle>Baked Goods</CategoryTitle>
          <RadioGroup>
            {bakedGoodsOptions.map((opt) => (
              <RadioLabel key={opt.id}>
                <input
                  type="checkbox"
                  name="baked"
                  value={opt.id}
                  checked={selectedBaked.includes(opt.id.toString())}
                  onChange={handleBakedChange}
                />
                {opt.label} (£{opt.price})
              </RadioLabel>
            ))}
          </RadioGroup>

          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <Button type="submit">Add Hamper to Cart</Button>
        </Form>
        {success && <SuccessMsg>Hamper added to cart!</SuccessMsg>}
      </Homebox>
    </Container>
  );
};

export default CustomHamperPage;