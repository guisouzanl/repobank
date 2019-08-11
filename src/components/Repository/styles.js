import styled from 'styled-components';

export const Loading = styled.h1`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;
    }

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const PageButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;

  button {
    background: none;
    border: 0;
  }
`;

export const PageButtonPrev = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.page === 1,
}))`
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const PageButtonNext = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.page === false,
}))`
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const EndIssues = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
`;

export const IssuesTypes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px;

  button {
    border-radius: 4px;
    outline: 0;
    border: 0;
    padding: 8px;
    margin: 0 0.25rem;
    background: rgba(113, 89, 193, 0.5);
    color: white;
    font-weight: bold;

    &:nth-child(${props => props.active + 1}) {
      background: #7159c1;
      color: white;
    }
  }
`;
