import Display from 'components/molecules/Display/Display';
import Keyboard from 'components/molecules/Keyboard/Keyboard';
import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  min-height: max-content;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.m};
  display: flex;
  flex-direction: column;
`;

const Calculator: React.FC = () => {
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [symbol, setSymbol] = useState('');
  return (
    <Wrapper>
      <Display
        firstValue={firstValue}
        secondValue={secondValue}
        symbol={symbol}
      />
      <Keyboard
        setFirstValue={setFirstValue}
        setSecondValue={setSecondValue}
        setSymbol={setSymbol}
        firstValue={firstValue}
        secondValue={secondValue}
        symbol={symbol}
      />
    </Wrapper>
  );
};

export default Calculator;
