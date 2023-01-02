import Button from 'components/atoms/Button/Button';
import { firebase } from 'consts/firebaseConsts';
import { inputs } from 'consts/inputConsts';
import { Timestamp } from 'firebase/firestore';
import useFirestore from 'hooks/useFirestore/useFirestore';
import React, { RefObject, useEffect } from 'react';
import styled from 'styled-components';
import Decimal from 'decimal.js';

const Wrapper = styled.div`
  padding: 2px;
  display: grid;
  gap: 2px 2px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  height: 50vh;
  ${({ theme }) => theme.mq.desktop} {
    height: max-content;
    padding: 10px;
  }
`;

const Keyboard: React.FC<{
  setFocus: (value: number | null) => void;
  focus: number | null;
  result: number | string;
  setLastResult: (value: string | null) => void;
  setResult: (value: string | number) => void;
  symbolRef: RefObject<HTMLInputElement>;
  firstValueRef: RefObject<HTMLInputElement>;
  secondValueRef: RefObject<HTMLInputElement>;
}> = ({
  secondValueRef,
  symbolRef,
  firstValueRef,
  setResult,
  setLastResult,
  result,
  setFocus,
  focus,
}) => {
  const { addDocument } = useFirestore();
  const calculate = (action: string, a: number, b: number) => {
    let currentResult: number | null = null;
    switch (action) {
      case inputs.addition:
        currentResult = Number(new Decimal(a).plus(b)); //floating point arithmetic error solve
        break;
      case inputs.subtraction:
        currentResult = Number(new Decimal(a).minus(b)); //floating point arithmetic error solve
        break;
      case inputs.multiplication:
        currentResult = a * b;
        break;
      case inputs.division:
        if (b != 0) {
          currentResult = a / b;
        } else setResult('nie można dzielić przez zero');
        break;
    }
    if (currentResult) {
      setResult(currentResult);
      addDocument(firebase.collections.calculations, {
        expression: String(a) + ' ' + action + ' ' + String(b),
        result: String(currentResult),
        timestamp: Timestamp.now(),
      });
    }
  };

  const clearAll = () => {
    firstValueRef.current ? (firstValueRef.current.value = '') : null;
    secondValueRef.current ? (secondValueRef.current.value = '') : null;
    symbolRef.current ? (symbolRef.current.value = '') : null;
    setResult('');
  };

  const floatValidation = (Ref: RefObject<HTMLInputElement>, value: string) => {
    if (Ref.current) {
      if (Ref.current.value.includes('.') && value != '.') {
        Ref.current.value += value;
      } else if (!Ref.current.value.includes('.')) {
        Ref.current.value += value;
      }
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;

    if (value == inputs.clearAll) {
      clearAll();
      setLastResult('');
      setFocus(null);
    } else if (value == inputs.clear) {
      if (focus == 0) {
        firstValueRef.current ? (firstValueRef.current.value = '') : null;
      } else if (focus == 1) {
        secondValueRef.current ? (secondValueRef.current.value = '') : null;
      } else if (
        firstValueRef.current?.value != '' &&
        secondValueRef.current?.value != ''
      ) {
        secondValueRef.current ? (secondValueRef.current.value = '') : null;
      } else if (
        symbolRef.current?.value != '' &&
        secondValueRef.current?.value == ''
      ) {
        symbolRef.current ? (symbolRef.current.value = '') : null;
      } else {
        clearAll();
      }
    } else if (
      value == inputs.addition ||
      value == inputs.subtraction ||
      value == inputs.multiplication ||
      value == inputs.division
    ) {
      setFocus(null);
      if (
        symbolRef.current?.value != '' &&
        firstValueRef.current?.value != '' &&
        secondValueRef.current?.value != '' &&
        result != ''
      ) {
        setLastResult(
          firstValueRef.current?.value +
            ' ' +
            symbolRef.current?.value +
            ' ' +
            secondValueRef.current?.value +
            ' = ' +
            String(result)
        );
      }
      symbolRef.current?.focus();
      symbolRef.current ? (symbolRef.current.value = value) : null;
    } else if (value == inputs.equal) {
      if (
        symbolRef.current &&
        firstValueRef.current &&
        secondValueRef.current
      ) {
        calculate(
          symbolRef.current.value,
          Number(firstValueRef.current.value),
          Number(secondValueRef.current.value)
        );
        setFocus(null);
      }
    } else if (focus == 0) {
      firstValueRef.current?.focus();
      floatValidation(firstValueRef, value);
    } else if (focus == 1) {
      secondValueRef.current?.focus();
      floatValidation(secondValueRef, value);
    } else if (
      symbolRef.current?.value != '' &&
      firstValueRef.current?.value != '' &&
      secondValueRef.current?.value != '' &&
      result != '' &&
      !isNaN(Number(value))
    ) {
      setLastResult(
        firstValueRef.current?.value +
          ' ' +
          symbolRef.current?.value +
          ' ' +
          secondValueRef.current?.value +
          ' = ' +
          String(result)
      );
      clearAll();
      firstValueRef.current?.focus();
      firstValueRef.current ? (firstValueRef.current.value += value) : null;
    } else if (
      firstValueRef.current &&
      (symbolRef.current?.value == '' || firstValueRef.current?.value == '')
    ) {
      firstValueRef.current.focus();
      floatValidation(firstValueRef, value);
    } else if (secondValueRef.current) {
      secondValueRef.current?.focus();
      floatValidation(secondValueRef, value);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.key === 'Enter' &&
        symbolRef.current &&
        firstValueRef.current &&
        secondValueRef.current
      ) {
        calculate(
          symbolRef.current.value,
          Number(firstValueRef.current.value),
          Number(secondValueRef.current.value)
        );
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <Wrapper>
      <Button value={inputs.clearAll} onClick={handleClick} />
      <Button value={inputs.division} onClick={handleClick} light />
      <Button value={inputs.multiplication} onClick={handleClick} light />
      <Button value={inputs.subtraction} onClick={handleClick} light />
      <Button value="7" onClick={handleClick} />
      <Button value="8" onClick={handleClick} />
      <Button value="9" onClick={handleClick} />
      <Button value={inputs.addition} onClick={handleClick} light />
      <Button value="4" onClick={handleClick} />
      <Button value="5" onClick={handleClick} />
      <Button value="6" onClick={handleClick} />
      <Button value="1" onClick={handleClick} />
      <Button value="2" onClick={handleClick} />
      <Button value="3" onClick={handleClick} />
      <Button value="C" onClick={handleClick} />
      <Button value="0" onClick={handleClick} />
      <Button value={'.'} onClick={handleClick} />
      <Button value={inputs.equal} onClick={handleClick} light />
    </Wrapper>
  );
};

export default Keyboard;
