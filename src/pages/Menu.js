import styled from "styled-components";

const Wrapper = styled.div`
  padding: 2rem;
  color: ${({ theme }) => theme.text};
  background-color: #ede0d4;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Menu = () => {

  return (
    <Wrapper>
        <>
          <h1>Welcome to the menu page! 🎉</h1>
        </>


    </Wrapper>
  );
};

export default Menu;