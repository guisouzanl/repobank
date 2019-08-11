import styled from 'styled-components';

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap');
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-family: 'Josefin Sans', sans-serif;
    font-size: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    svg {
      margin-bottom: 10px;
    }
  }
`;

export default Container;
