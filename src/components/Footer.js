import styled from "styled-components";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const FooterBar = styled.footer`
  margin-top: auto;
  background: #4e4539;
  border-top: 6px solid #43533d;
  color: #f3e6d3;
  padding: 1rem 2rem;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1.2fr 1fr 1fr;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  h3 {
    margin: 0;
    font-weight: 700;
    letter-spacing: 0.4px;
    color: #c49a6c;
  }

  p {
    margin: 0;
    opacity: 0.85;
    font-size: 0.95rem;
  }

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const Links = styled.nav`
  display: flex;
  gap: 1rem;
  justify-content: center;

  a {
    color: #f3e6d3;
    text-decoration: none;
    padding: 0.3rem 0.4rem;
    border-radius: 6px;
    transition: 0.2s ease;
    font-size: 0.95rem;

    &:hover {
      background: #614b34;
      color: #c49a6c;
    }
  }

  @media (max-width: 900px) {
    flex-wrap: wrap;
  }
`;

const Social = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: #3f382e;
    color: #f3e6d3;
    transition: 0.2s ease;

    &:hover {
      background: #c49a6c;
      color: #2b241d;
      transform: translateY(-2px);
    }
  }

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #baa78c;
  margin: 1rem 0 0.5rem;
  opacity: 0.35;
`;

const Bottom = styled.div`
  font-size: 0.9rem;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  flex-wrap: wrap;
  opacity: 0.85;

  a {
    color: #c49a6c;
    text-decoration: none;
  }

  @media (max-width: 900px) {
    justify-content: center;
    text-align: center;
  }
`;

export default function Footer() {

  return (
    <FooterBar>
      <Inner>
        <Brand>
          <div>
            <h3>Bean & Brew</h3>
            <p>Small-batch coffee, baked fresh daily.</p>
          </div>
        </Brand>

        <Links aria-label="Footer navigation">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/campaign">Campaign</a>
        </Links>

        <Social aria-label="Social links">
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" aria-label="Twitter/X" target="_blank" rel="noreferrer">
            <FaTwitter />
          </a>
        </Social>
      </Inner>

      <Divider />

      <Bottom>
        <span>© {new Date().getFullYear()} Bean and Brew. Built by Jakub Pietkun</span>
      </Bottom>
    </FooterBar>
  );
}
