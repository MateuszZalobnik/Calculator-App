import React, { ChangeEvent, RefObject } from 'react';
import { inputs } from 'consts/inputConsts';
import { InputsWrapper, LastResultWrapper, NumberInput, ResultWrapper, SymbolInput, Wrapper } from './Display.style';



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
