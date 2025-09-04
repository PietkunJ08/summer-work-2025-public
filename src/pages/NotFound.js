import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFoundWrapper = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #baa78c;
  background: #4e4539ff;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
  color: #c49a6c;
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    color: #756a5c;
  }
`;

const NotFound = () => (
  <NotFoundWrapper>
    <Title>404</Title>
    <Message>Sorry, the page you are looking for does not exist.</Message>
    <StyledLink to="/">Go back home</StyledLink>
  </NotFoundWrapper>
);

export default NotFound;