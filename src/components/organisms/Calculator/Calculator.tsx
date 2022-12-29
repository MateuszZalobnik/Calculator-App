import Display from 'components/molecules/Display/Display';
import Keyboard from 'components/molecules/Keyboard/Keyboard';
import React, { useRef, useState } from 'react';
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
  const [result, setResult] = useState<number | string>('');
  const symbolRef = useRef<HTMLInputElement>();
  const firstValueRef = useRef<HTMLInputElement>();
  const secondValueRef = useRef<HTMLInputElement>();

  return (
    <Wrapper>
      <Display
        result={result}
        symbolRef={symbolRef}
        firstValueRef={firstValueRef}
        secondValueRef={secondValueRef}
      />
      <Keyboard
        setResult={setResult}
        symbolRef={symbolRef}
        firstValueRef={firstValueRef}
        secondValueRef={secondValueRef}
      />
    </Wrapper>
  );
};

export default Calculator;
