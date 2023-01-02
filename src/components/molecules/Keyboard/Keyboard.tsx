import Button from 'components/atoms/Button/Button';
import { inputs } from 'consts/inputConsts';
import React, { RefObject, useEffect } from 'react';
import { calculate, clearAll, handleKeyboard } from './helpers';
import { Wrapper } from './Keyboard.style';

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
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleKeyboard(
      event,
      firstValueRef,
      secondValueRef,
      symbolRef,
      setFocus,
      focus,
      setLastResult,
      result,
      setResult
    );
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.key === 'Enter' &&
        symbolRef.current &&
        firstValueRef.current &&
        secondValueRef.current
      ) {
        setResult(
          calculate(
            symbolRef.current.value,
            Number(firstValueRef.current.value),
            Number(secondValueRef.current.value)
          )
        );
        setLastResult(
          firstValueRef.current?.value +
            ' ' +
            symbolRef.current?.value +
            ' ' +
            secondValueRef.current?.value +
            ' = ' +
            calculate(
              symbolRef.current.value,
              Number(firstValueRef.current.value),
              Number(secondValueRef.current.value)
            )
        );
        clearAll(firstValueRef, secondValueRef, symbolRef);
        firstValueRef.current.focus();
        setFocus(0);
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
