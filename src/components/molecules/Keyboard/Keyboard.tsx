import Button from 'components/atoms/Button/Button';
import { inputs } from 'consts/inputConsts';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 45vh;
  padding: 20px;
  display: grid;
  gap: 20px 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
`;

const Keyboard: React.FC<{
  setResult: (value: string | number) => void;
  symbolRef: any;
  firstValueRef: any;
  secondValueRef: any;
}> = ({ secondValueRef, symbolRef, firstValueRef, setResult }) => {
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    if (
      value == inputs.addition ||
      value == inputs.subtraction ||
      value == inputs.multiplication ||
      value == inputs.division
    ) {
      symbolRef.current.focus();
      symbolRef.current.value = value;
    } else if (value == inputs.clearAll) {
      firstValueRef.current.value = '';
      secondValueRef.current.value = '';
      symbolRef.current.value = '';
    } else if (
      symbolRef.current.value == '' ||
      firstValueRef.current.value == ''
    ) {
      firstValueRef.current.focus();
      firstValueRef.current.value += value;
    } else if (value == inputs.equal) {
      calculate(
        symbolRef.current.value,
        Number(firstValueRef.current.value),
        Number(secondValueRef.current.value)
      );
    } else {
      secondValueRef.current.focus();
      secondValueRef.current.value += value;
    }
  };
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
      <Button value="," onClick={handleClick} />
      <Button value={inputs.equal} onClick={handleClick} light />
    </Wrapper>
  );
};

export default Keyboard;
