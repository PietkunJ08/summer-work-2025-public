import { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div`
position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  min-height: 80vh;
  z-index: 0;
`;

const Homebox = styled.div`
  width: 40%;
  padding: 0.8rem;
  text-align: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.17);
  box-shadow: 10px 8px 18px rgba(0, 0, 0, 0.87);
  backdrop-filter: blur(15px);
  color: rgba(40, 49, 44, 1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1b1b1bff;
`;

const Subtitle = styled.p`
  color: #313131ff;
`;

const Form = styled.form`
  background: #dbdbdb81;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.25rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const TimeSlots = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
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

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const BakingLessonsPage = () => {
  const lessonsByDifficulty = {
    Beginner: ["Bread Basics", "Cupcake Decorating", "Cookie Making"],
    Intermediate: ["Artisan Bread", "Layered Cakes", "French Pastries"],
    Advanced: ["Sourdough Mastery", "Chocolate Sculpting", "Wedding Cakes"],
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    difficulty: "Beginner",
    lesson: "Bread Basics",
    date: null,
    time: "",
    participants: 1,
    notes: ""
  });

  const timeSlots = ["09:45", "13:00", "17:30"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset lesson if difficulty changes
    if (name === "difficulty") {
      setFormData({
        ...formData,
        difficulty: value,
        lesson: lessonsByDifficulty[value][0],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.time || formData.participants < 1 || !formData.name || !formData.email) {
      toast.error("Please fill in all required fields.");
      return;
    } else{
      toast.success(`Booking confirmed:\n${formData.difficulty} - ${formData.lesson}\n${formData.date?.toDateString()} at ${formData.time}`);
    }
    setTimeout(() => window.location.reload(), 3000);
  };
  return (
    <Container>
      <Homebox>
        <Header>
          <Title>Book a Baking Lesson</Title>
          <Subtitle>Choose your level of difficulty, lesson, date and time</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Difficulty */}
          <div>
            <Label>Difficulty Level</Label>
            <Select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              {Object.keys(lessonsByDifficulty).map((level) => (
                <option key={level}>{level}</option>
              ))}
            </Select>
          </div>

          {/* Lesson (depends on difficulty) */}
          <div>
            <Label>Lesson Type</Label>
            <Select
              name="lesson"
              value={formData.lesson}
              onChange={handleChange}
            >
              {lessonsByDifficulty[formData.difficulty].map((lesson) => (
                <option key={lesson}>{lesson}</option>
              ))}
            </Select>
          </div>

          {/* Date */}
          <div>
            <Label>Select Date</Label>
            <DatePicker
              selected={formData.date}
              dateFormat={"MMMM d, yyyy"}
              onChange={(date) => setFormData({ ...formData, date })}
              minDate={new Date()}
              customInput={<Input />}
            />
          </div>

          {/* Time */}
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

          {/* Participants */}
          <div>
            <Label>Participants</Label>
            <Input
              type="number"
              name="participants"
              min="1"
              value={formData.participants}
              onChange={handleChange}
            />
          </div>

          {/* Notes */}
          <div>
            <Label>Special Requests</Label>
            <TextArea
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <SubmitButton
            type="submit"
          >
            Confirm Booking
          </SubmitButton>
        </Form>
      </Homebox>
    </Container>
  );
};

export default BakingLessonsPage;