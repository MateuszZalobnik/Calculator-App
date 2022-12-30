import Button from 'components/atoms/Button/Button';
import { inputs } from 'consts/inputConsts';
import React, { RefObject, useEffect } from 'react';
import styled from 'styled-components';

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
}) => {
  const calculate = (action: string, a: number, b: number) => {
    switch (action) {
      case inputs.addition:
        setResult(a + b);

        break;
      case inputs.subtraction:
        setResult(a - b);
        break;
      case inputs.multiplication:
        setResult(a * b);
        break;
      case inputs.division:
        b != 0 ? setResult(a / b) : setResult('nie można dzielić przez zero');
        break;
    }
  };

  const clearAll = () => {
    firstValueRef.current ? (firstValueRef.current.value = '') : null;
    secondValueRef.current ? (secondValueRef.current.value = '') : null;
    symbolRef.current ? (symbolRef.current.value = '') : null;
    setResult('');
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;

    if (value == inputs.clearAll) {
      clearAll();
      setLastResult('');
    } else if (
      value == inputs.addition ||
      value == inputs.subtraction ||
      value == inputs.multiplication ||
      value == inputs.division
    ) {
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
      }
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
      symbolRef.current?.value == '' ||
      firstValueRef.current?.value == ''
    ) {
      firstValueRef.current?.focus();
      firstValueRef.current ? (firstValueRef.current.value += value) : null;
    } else {
      secondValueRef.current?.focus();
      secondValueRef.current ? (secondValueRef.current.value += value) : null;
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
