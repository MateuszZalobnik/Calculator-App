import React, { MutableRefObject, RefObject } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 15vh;
  padding: 20px 20px 0px 20px;
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

const NumberInput = styled.input`
  width: 40%;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  font-size: ${({ theme }) => theme.fontSize.l};
  text-align: end;
  border: none;
  :focus {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
  }
`;

const SymbolInput = styled.input`
  width: 10%;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  font-size: ${({ theme }) => theme.fontSize.l};
  text-align: center;
  border: none;
  :focus {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
  }
`;

const ResultWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

const Display: React.FC<{
  firstValue: string;
  secondValue: string;
  symbol: string;
}> = ({ firstValue, secondValue, symbol }) => {
  return (
    <Wrapper>
      <InputsWrapper>
        <NumberInput type="number" value={firstValue} />
        <SymbolInput type="text" pattern="[+-/*]" value={symbol} />
        <NumberInput type="number" value={secondValue} />
      </InputsWrapper>
      <ResultWrapper>
        <span>=</span>
        <div>1000</div>
      </ResultWrapper>
    </Wrapper>
  );
};

export default Display;
