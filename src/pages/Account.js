import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config/api";

const Wrapper = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme?.text || "#2b241d"};
  background-color: #ede0d4;
  min-height: 50vh;
`;

const Card = styled.div`
  max-width: 560px;
  margin: 1rem auto;
  text-align: left;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  background: rgba(255,255,255,0.5);
  box-shadow: 0 8px 18px rgba(0,0,0,.15);
  line-height: 1.6;
`;

export default function Account() {
  const { token, isAuthed } = useAuth();
  const [profile, setProfile] = useState(null);
  const [state, setState] = useState({ loading: true, error: "" });
  const nav = useNavigate();

  useEffect(() => {
    if (!isAuthed) {
      nav("/signin");
      return;
    }
    let isMounted = true;

    (async () => {
        try {
            const res = await fetch(apiUrl("/api/users/me"), {
                headers: { Authorization: `Bearer ${token}` }
            });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || `Failed (${res.status})`);
        if (isMounted) setProfile(data.user);
      } catch (e) {
        if (isMounted) setState(s => ({ ...s, error: e.message }));
      } finally {
        if (isMounted) setState(s => ({ ...s, loading: false }));
      }
    })();

    return () => { isMounted = false; };
  }, [isAuthed, token, nav]);

  if (state.loading) return <Wrapper><h2>Loading your account…</h2></Wrapper>;
  if (state.error)   return <Wrapper><h2>Could not load account</h2><p>{state.error}</p></Wrapper>;

  return (
    <Wrapper>
      <h1>Welcome to the account page! 🎉</h1>
      {profile && (
        <Card>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role}</p>
          <p><strong>Member since:</strong> {new Date(profile.created_at).toLocaleString()}</p>
        </Card>
      )}
    </Wrapper>
  );
}
