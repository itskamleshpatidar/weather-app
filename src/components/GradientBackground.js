import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ temp }) => {
    if (temp < -30) return 'linear-gradient(to bottom right, #102F7E, #60C6FF)';
    if (temp < -10) return 'linear-gradient(to bottom right, #0C8DD6, #FFD66B)';
    if (temp < 0) return 'linear-gradient(to bottom right, #1AA0EC, #9BDBFF)';
    if (temp < 10) return 'linear-gradient(to bottom right, #102F7E, #9BDBFF)';
    if (temp < 20) return 'linear-gradient(to bottom right, #0C8DD6, #FFD66B)';
    if (temp < 30) return 'linear-gradient(to bottom right, #1AA0EC, #FFC178)';
    if (temp <= 40) return 'linear-gradient(to bottom right, #60C6FF, #FE9255)';
    return 'linear-gradient(to bottom right, #FE9255, #FF7E5F)';
  }};
  transition: background 0.5s ease;
`;

const GradientBackground = ({ temp, children }) => {
  return <Background temp={30}>{children}</Background>;
};

export default GradientBackground;
