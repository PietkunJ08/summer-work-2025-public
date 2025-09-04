import styled from "styled-components";
import { motion } from "framer-motion";
import cakeImg from "../media/images/campaign/RateMyCake.png";
import BgImg from "../media/images/backgrounds/home-page2.png";
import { GiStairsCake } from "react-icons/gi";

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
  background: rgba(255, 255, 255, 0.20);
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

const CampaignHeader = styled(motion.h1)`
  font-size: 2.6rem;
  text-align: center;
  margin-top: 0;
  margin-bottom: 1rem;
`;

const CampaignDescription = styled.p`
  font-size: 1.3rem;
  max-width: 600px;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ImageWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
`;

const CakeImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
`;

const CampaignPage = () => {
  return (
    <>
      <Background />
      <CenterBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <CampaignHeader
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        > 
          <GiStairsCake style={{ marginTop: "1rem", marginRight: "0.8rem" }} />
          Rate My Cake!
          <GiStairsCake style={{ marginTop: "1rem", marginLeft: "0.7rem" }} />
        </CampaignHeader>
        <CampaignDescription>
          We’re celebrating all things sweet! Share a photo of your cake, vote for your favorites,
          and stand a chance to win a <strong>free coffee and dessert combo</strong> at Bean & Brew.
          It’s time to show off your baking skills and join our friendly foodie competition.
        </CampaignDescription>
        <ImageWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <CakeImage src={cakeImg} alt="Delicious Cake" />
        </ImageWrapper>
      </CenterBox>
    </>
  );
};

export default CampaignPage;
