import React, { ChangeEvent, RefObject } from 'react';
import styled from 'styled-components';
import { inputs } from 'consts/inputConsts';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px 20px 0px 20px;
  height: 50vh;
  ${({ theme }) => theme.mq.desktop} {
    padding: 15px 15px 10vh 15px;
    height: max-content;
  }
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
  margin-top: 5px;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

const LastResultWrapper = styled.div`
  display: flex;
  margin-top: 5px;
  justify-content: end;
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const Display: React.FC<{
  lastResult: string | null;
  result: number | string;
  symbolRef: RefObject<HTMLInputElement>;
  firstValueRef: RefObject<HTMLInputElement>;
  secondValueRef: RefObject<HTMLInputElement>;
}> = ({ secondValueRef, symbolRef, firstValueRef, result, lastResult }) => {
  return (
    <Wrapper>
      <InputsWrapper>
        <NumberInput
          type="number"
          pattern="^\d*(\.\d{0,2})?$"
          ref={firstValueRef}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            firstValueRef.current
              ? (firstValueRef.current.value = e.target.value)
              : '222';
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
              symbolRef.current
                ? (symbolRef.current.value = e.target.value)
                : null;
            } else {
              symbolRef.current ? (symbolRef.current.value = '') : null;
            }
          }}
        />
        <NumberInput
          type="number"
          ref={secondValueRef}
          onChange={(e) => {
            secondValueRef.current
              ? (secondValueRef.current.value = e.target.value)
              : null;
          }}
        />
      </InputsWrapper>
      {lastResult ? <LastResultWrapper>{lastResult}</LastResultWrapper> : null}
      <ResultWrapper>
        <span>=</span>
        <div>{result}</div>
      </ResultWrapper>
    </Wrapper>
  );
};

export default Display;
