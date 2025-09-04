import styled from "styled-components";
import { motion } from "framer-motion";

const HomeContainer = styled.section`
  min-height: 100%;
  display: grid;
  place-items: center;
  padding: 17.5rem;
`;

const HomeBox = styled.div`
  width: clamp(260px, 40vw, 560px);
  padding: 1.25rem 1.5rem;
  text-align: center;
  border-radius: 12px;
  background: rgba(148, 148, 148, 0.53);
  box-shadow: 10px 8px 18px rgba(0, 0, 0, 0.87);
  backdrop-filter: blur(5px);
  color: #28312c;

  h1 {
    margin: 0 0 0.25rem 0;
    color: #fff7ee;
    line-height: 1.2;
  }

  p {
    margin: 0;
    color: #f2e7d6;
  }
`;

export default function HomePage() {
  return (
    <HomeContainer>
      <motion.div
        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <HomeBox>
          <h1>Welcome to Bean & Brew!</h1>
          <p>Small-batch coffee, baked fresh daily.</p>
        </HomeBox>
      </motion.div>
    </HomeContainer>
  );
}