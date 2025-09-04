// src/pages/SignIn.jsx
import { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Box = styled.form`
  margin: 4rem auto;
  max-width: 420px;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(15px);
  color: #fff;
  box-shadow: 10px 8px 18px rgba(0,0,0,.6);
  display: grid;
  gap: .8rem;
  input { padding: .6rem .7rem; border-radius: 8px; border: 1px solid #baa78c; }
  button { background: #c49a6c; color: #fff; border: 0; padding: .7rem;
    border-radius: 8px; cursor: pointer; }
  a { color: #c49a6c; }
`;

export default function SignIn() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Signed in. Welcome back! ☕");
      nav("/");
    } catch (err) {
      toast.error(err.message || "Invalid email or password");
    }
    };
    
  return (
    <Box onSubmit={onSubmit}>
      <h2>Sign In</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Sign In</button>
      <div>New here? <Link to="/signup">Create an account</Link></div>
    </Box>
  );
}
