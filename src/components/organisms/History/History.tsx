import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  min-height: max-content;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.m};
  display: flex;
  flex-direction: column;
`;

const History: React.FC = () => {
  return <Wrapper>histora</Wrapper>;
};

export default History;
