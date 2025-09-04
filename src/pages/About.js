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
  max-width: 900px;
  padding-bottom: 1.5rem;
  margin: 2.5rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(27, 34, 30, 1);
`;

const AboutHeader = styled(motion.h1)`
  font-size: 2.6rem;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const AboutDescription = styled.p`
  font-size: 1.4rem;
  max-width: 800px;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 0.5rem;
`;

const AboutPage = () => {
  return (
    <>
      <Background />
      <CenterBox>
        <AboutHeader> 
          About Us
        </AboutHeader>
        <AboutDescription>
          At Bean and Brew, we’re passionate about great coffee, delicious food, and bringing people together. Based in Harrogate and Leeds, our local cafes and restaurants serve everything from handcrafted coffees and breakfast favorites to sweet treats and freshly pressed sandwiches.
          <br />
          <br />
          We’ve always believed in doing things differently—Bean and Brew was one of the first UK chains to use fair-trade coffee and organic milk, and every drink is made just the way you like it. Our menu also includes our trademark flavored coffees, frappes, fruit smoothies, and seasonal delights like pumpkin spiced lattes and assorted baked goodies.
          <br />
          <br /> 
          More than just a café, we offer bakery takeaways and even baking lessons, sharing our love for good food with the community. Whether you’re stopping by for a morning coffee or a casual meal, Bean and Brew is all about warmth, flavor, and a personal touch.
        </AboutDescription>
      </CenterBox>
    </>
  );
};

export default AboutPage;
