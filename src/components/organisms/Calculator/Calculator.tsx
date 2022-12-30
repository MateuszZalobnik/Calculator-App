import Display from 'components/molecules/Display/Display';
import Keyboard from 'components/molecules/Keyboard/Keyboard';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mq.desktop} {
    border-radius: ${({ theme }) => theme.borderRadius.m};
  }
`;

const Calculator: React.FC = () => {
  const [result, setResult] = useState<number | string>('');
  const [lastResult, setLastResult] = useState<string | null>(null);
  const symbolRef = useRef<HTMLInputElement>(null);
  const firstValueRef = useRef<HTMLInputElement>(null);
  const secondValueRef = useRef<HTMLInputElement>(null);

  return (
    <Wrapper>
      <Display
        result={result}
        symbolRef={symbolRef}
        firstValueRef={firstValueRef}
        secondValueRef={secondValueRef}
        lastResult={lastResult}
      />
      <Keyboard
        setLastResult={setLastResult}
        result={result}
        setResult={setResult}
        symbolRef={symbolRef}
        firstValueRef={firstValueRef}
        secondValueRef={secondValueRef}
      />
    </Wrapper>
  );
};

export default Calculator;
