import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { motion } from "framer-motion";
import BgImg from "../media/images/backgrounds/home-page2.png";

const Background = styled.div`
  background-image: url(${BgImg});
  background-size: cover;
  background-position: top;
  background-attachment: fixed;
  background-repeat: no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
`;

const CenterBox = styled(motion.div)`
  background: rgba(255, 255, 255, 0.28);
  border-radius: 18px;
  box-shadow: 10 8px 18px rgba(0, 0, 0, 0.87);
  backdrop-filter: blur(20px);
  max-width: 650px;
  padding-bottom: 1.5rem;
  margin: 2.5rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(27, 34, 30, 1);
`;

const ContactHeader = styled(motion.h1)`
  font-size: 2.6rem;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1d1d1dff;
`;

const Subtitle = styled.p`
  color: #292929ff;
  font-size: 1.2rem;
  max-width: 600px;
`;

const Form = styled.form`
  background: #dbdbdb81;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 460px;
  align-items: center;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 450px;
`

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.25rem;
  display: block;
  text-align: left;
  width: 80%;
`;

const Input = styled.input`
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

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success("Message sent successfully!");
    setTimeout(() => window.location.reload(), 1500);
  };

  return (
    <>
      <Background />
      <CenterBox>
        <ContactHeader> 
          <Title>Contact Us</Title>
          <Subtitle>We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.</Subtitle>
        </ContactHeader>

        <Form onSubmit={handleSubmit}>
          <FormItem>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <Label>Subject</Label>
            <Input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <Label>Message</Label>
            <TextArea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
            />
          </FormItem>

          <SubmitButton type="submit">Send Message</SubmitButton>
        </Form>
      </CenterBox>
    </>
  );
};

export default ContactPage;
