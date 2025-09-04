import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Styled components
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
const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #252525ff;
`;

const Subtitle = styled.p`
  color: #333333ff;
`;

const Form = styled.form`
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.25rem;
  display: block;
  width: 100%;
`;

const Input = styled.input`
  width: 80%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const Select = styled.select`
  width: 80%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const TextArea = styled.textarea`
  width: 80%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const TimeSlots = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  width: 100%;
  max-width: 400px;
`;

const TimeButton = styled.button`
  padding: 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => (props.selected ? "#c49a6c" : "#ccc")};
  background: ${(props) => (props.selected ? "#c49a6c" : "#f8f8f8")};
  color: ${(props) => (props.selected ? "#fff" : "#333")};
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.selected ? "#614b34" : "#eee")};
  }
`;

const SubmitButton = styled.button`
  width: 50%;
  padding: 0.8rem;
  background: #c49a6c;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #614b34;
  }
`;

export default function RestaurantReservation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: null,
    time: "",
    guests: 2,
    notes: ""
  });

  const timeSlots = [
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      toast.error("Please fill in required fields.");
      return;
    }
    toast.success("Reservation confirmed! We look forward to serving you.");

    // Refresh page after 3 seconds
    setTimeout(() => window.location.reload(), 3000);
  };

  return (
    <Container>
        <Homebox>
            <Header>
                <Title>Reserve a Table at The Leeds Restaurant</Title>
                <Subtitle>Book your dining experience with us 🍽️</Subtitle>
            </Header>

            <Form onSubmit={handleSubmit}>
                <div>
                <Label>Full Name</Label>
                <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                </div>

                <div>
                <Label>Email</Label>
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                </div>

                <div>
                <Label>Phone Number</Label>
                <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                </div>

                <div>
                <Label>Date</Label>
                <DatePicker
                    selected={formData.date}
                    onChange={(date) => setFormData({ ...formData, date })}
                    minDate={new Date()}
                    customInput={<Input />}
                    dateFormat="MMMM d, yyyy"
                />
                </div>

                {formData.date && (
                <div>
                    <Label>Available Time Slots</Label>
                    <TimeSlots>
                    {timeSlots.map((slot) => (
                        <TimeButton
                        key={slot}
                        type="button"
                        selected={formData.time === slot}
                        onClick={() => setFormData({ ...formData, time: slot })}
                        >
                        {slot}
                        </TimeButton>
                    ))}
                    </TimeSlots>
                </div>
                )}

                <div>
                <Label>Number of Guests</Label>
                <Select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                >
                    {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                        {i + 1}
                    </option>
                    ))}
                </Select>
                </div>

                <div>
                <Label>Special Requests</Label>
                <TextArea
                    name="notes"
                    rows="3"
                    value={formData.notes}
                    onChange={handleChange}
                />
                </div>

                <SubmitButton type="submit">
                Confirm Reservation
                </SubmitButton>
            </Form>
        </Homebox>
    </Container>
  );
}
