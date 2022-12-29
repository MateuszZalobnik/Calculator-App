import React from 'react';
import styled from 'styled-components';
import { inputs } from 'consts/inputConsts';

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
  result: number | string;
  symbolRef: any;
  firstValueRef: any;
  secondValueRef: any;
}> = ({ secondValueRef, symbolRef, firstValueRef, result }) => {
  return (
    <Wrapper>
      <InputsWrapper>
        <NumberInput
          type="number"
          ref={firstValueRef}
          onChange={(e) => {
            firstValueRef.current.value = e.target.value;
          }}
        />
        <SymbolInput
          type="text"
          ref={symbolRef}
          onChange={(e) => {
            if (
              e.target.value == inputs.addition ||
              e.target.value == inputs.subtraction ||
              e.target.value == inputs.division ||
              e.target.value == inputs.multiplication
            ) {
              symbolRef.current.value = e.target.value;
            }
          }}
        />
        <NumberInput
          type="number"
          ref={secondValueRef}
          onChange={(e) => {
            secondValueRef.current.value = e.target.value;
          }}
        />
      </InputsWrapper>
      <ResultWrapper>
        <span>=</span>
        <div>{result}</div>
      </ResultWrapper>
    </Wrapper>
  );
};

export default Display;
