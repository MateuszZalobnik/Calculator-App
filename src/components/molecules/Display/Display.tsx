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
interface ResultProps {
  length: number;
}
const ResultWrapper = styled.div<ResultProps>`
  display: flex;
  margin-top: 5px;
  justify-content: space-between;
  font-size: ${({ length, theme }) => {
    if (length > 20) {
      return theme.fontSize.s;
    } else if (length > 10) {
      return theme.fontSize.m;
    } else {
      return theme.fontSize.m;
    }
  }};

  ${({ theme }) => theme.mq.smartphone} {
    font-size: ${({ length, theme }) => {
      if (length > 15) {
        return theme.fontSize.l;
      } else if (length > 20) {
        return theme.fontSize.m;
      } else {
        return theme.fontSize.m;
      }
    }};
 
    ${({ theme }) => theme.mq.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl};
`;
interface LastResultProps {
  length: number;
}
const LastResultWrapper = styled.div<LastResultProps>`
  display: flex;
  margin-top: 5px;
  justify-content: end;
  font-size: ${({ length, theme }) => {
    if (length > 40) {
      return theme.fontSize.xs;
    } else {
      return theme.fontSize.m;
    }
  }};
  ${({ theme }) => theme.mq.smartphone} {
    font-size: ${({ length, theme }) => {
      if (length > 40) {
        return theme.fontSize.s;
      } else {
        return theme.fontSize.m;
      }
    }};
`;

const Display: React.FC<{
  setFocus: (value: number | null) => void;
  lastResult: string | null;
  result: number | string;
  symbolRef: RefObject<HTMLInputElement>;
  firstValueRef: RefObject<HTMLInputElement>;
  secondValueRef: RefObject<HTMLInputElement>;
}> = ({
  secondValueRef,
  symbolRef,
  firstValueRef,
  result,
  lastResult,
  setFocus,
}) => {
  const handleChange = (
    //prevent from letters and other chars
    event: ChangeEvent<HTMLInputElement>,
    Ref: RefObject<HTMLInputElement>
  ) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (Ref.current) {
      if (regex.test(event.target.value) && event.target.value != ',') {
        // The entered value is a number or a dot, so we can allow the change
        Ref.current.value = event.target.value;
      } else {
        // The entered value is not a number or a dot, so we can prevent the change
        Ref.current.value = Ref.current.value.substring(
          0,
          Ref.current.value.length - 1
        );
      }
    }
  };

  return (
    <Wrapper>
      <InputsWrapper>
        <NumberInput
          type="text" //type number not allow comma and dot using rendered keyboard
          inputMode="numeric" //inputmode display number keyboard on smartphones
          ref={firstValueRef}
          onFocus={() => setFocus(0)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(e, firstValueRef);
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
          type="text" //type number not allow comma and dot using rendered keyboard
          inputMode="numeric" //inputmode display number keyboard on smartphones
          ref={secondValueRef}
          onFocus={() => setFocus(1)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(e, secondValueRef);
          }}
        />
      </InputsWrapper>
      {lastResult ? (
        <LastResultWrapper length={lastResult.length}>
          {lastResult}
        </LastResultWrapper>
      ) : null}
      <ResultWrapper length={String(result).length}>
        <span>=</span>
        <div>{result}</div>
      </ResultWrapper>
    </Wrapper>
  );
};

export default Display;
