import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NotFoundWrapper = styled.section`
  padding: 20px;
  text-align: center;

  h2 {
    margin: 10px;
    font-size: 4em;
  }

  h5 {
    margin: 5px;
  }

  a {
    color: #333;
    text-decoration: underline;
  }
`;

const NotFound: React.FC = () => {
  return <NotFoundWrapper>
    <h2>404</h2>
    <h5>Oops, it looks like u are lost.</h5>
    <Link to={'/'}>Back to home page.</Link>
  </NotFoundWrapper>
}

export default NotFound
