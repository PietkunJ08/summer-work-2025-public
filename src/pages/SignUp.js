// src/pages/SignUp.jsx
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

export default function SignUp() {
  const { signup, login } = useAuth();
  const nav = useNavigate();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const onSubmit = async (e)=> {
    e.preventDefault();
    try {
      await signup({ name, email, password });
      toast.success("Your account has been created 🎉");
      // optional auto-login:
      await login(email, password);
      nav("/");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };
  return (
    <Box onSubmit={onSubmit}>
      <h2>Create Account</h2>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Sign Up</button>
      <div>Already have an account? <Link to="/signin">Sign in</Link></div>
    </Box>
  );
}
