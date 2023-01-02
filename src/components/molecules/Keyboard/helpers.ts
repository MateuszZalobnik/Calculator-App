import Decimal from 'decimal.js';
import { Timestamp } from 'firebase/firestore';
import useFirestore from 'hooks/useFirestore/useFirestore';
import { firebase } from 'consts/firebaseConsts';
import { inputs } from 'consts/inputConsts';
import { RefObject } from 'react';

const { addDocument } = useFirestore();

export const calculate = (action: string, a: number, b: number): string => {
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
      } else return 'nie można dzielić przez zero';
      break;
  }
  if (currentResult) {
    addDocument(firebase.collections.calculations, {
      expression: String(a) + ' ' + action + ' ' + String(b),
      result: String(currentResult),
      timestamp: Timestamp.now(),
    });
    return String(currentResult);
  } else {
    return 'error';
  }
};

export const clearAll = (
  firstValueRef: RefObject<HTMLInputElement>,
  secondValueRef: RefObject<HTMLInputElement>,
  symbolRef: RefObject<HTMLInputElement>
) => {
  firstValueRef.current ? (firstValueRef.current.value = '') : null;
  secondValueRef.current ? (secondValueRef.current.value = '') : null;
  symbolRef.current ? (symbolRef.current.value = '') : null;
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

export const handleKeyboard = (
  event: React.MouseEvent<HTMLButtonElement>,
  firstValueRef: RefObject<HTMLInputElement>,
  secondValueRef: RefObject<HTMLInputElement>,
  symbolRef: RefObject<HTMLInputElement>,
  setFocus: (value: number | null) => void,
  focus: number | null,
  setLastResult: (value: string | null) => void,
  result: string | number,
  setResult: (value: string | number) => void
) => {
  const value = event.currentTarget.value;
  const handleClearAll = () => {
    clearAll(firstValueRef, secondValueRef, symbolRef);
  };
  if (firstValueRef.current && secondValueRef.current && symbolRef.current) {
    if (value == inputs.clearAll) {
      handleClearAll();
      setLastResult('');
      setResult('');
      setFocus(null);
    } else if (value == inputs.clear) {
      if (focus == 0) {
        firstValueRef.current.value = '';
      } else if (focus == 1) {
        secondValueRef.current.value = '';
      } else if (
        firstValueRef.current.value != '' &&
        secondValueRef.current.value != ''
      ) {
        secondValueRef.current.value = '';
      } else if (
        symbolRef.current.value != '' &&
        secondValueRef.current.value == ''
      ) {
        symbolRef.current.value = '';
      } else {
        handleClearAll();
        setResult('');
      }
    } else if (
      value == inputs.addition ||
      value == inputs.subtraction ||
      value == inputs.multiplication ||
      value == inputs.division
    ) {
      setFocus(null);
      if (
        symbolRef.current.value != '' &&
        firstValueRef.current.value != '' &&
        secondValueRef.current.value != '' &&
        result != ''
      ) {
        setLastResult(
          firstValueRef.current.value +
            ' ' +
            symbolRef.current.value +
            ' ' +
            secondValueRef.current?.value +
            ' = ' +
            String(result)
        );
      }
      symbolRef.current.focus();
      symbolRef.current.value = value;
    } else if (value == inputs.equal) {
      setResult(
        calculate(
          symbolRef.current.value,
          Number(firstValueRef.current.value),
          Number(secondValueRef.current.value)
        )
      );
      setFocus(null);
    } else if (focus == 0) {
      firstValueRef.current.focus();
      floatValidation(firstValueRef, value);
    } else if (focus == 1) {
      secondValueRef.current?.focus();
      floatValidation(secondValueRef, value);
    } else if (
      symbolRef.current.value != '' &&
      firstValueRef.current.value != '' &&
      secondValueRef.current.value != '' &&
      result != '' &&
      !isNaN(Number(value))
    ) {
      setLastResult(
        firstValueRef.current.value +
          ' ' +
          symbolRef.current.value +
          ' ' +
          secondValueRef.current.value +
          ' = ' +
          String(result)
      );
      handleClearAll();
      setResult('');
      firstValueRef.current.focus();
      firstValueRef.current.value += value;
    } else if (
      symbolRef.current.value == '' ||
      firstValueRef.current.value == ''
    ) {
      firstValueRef.current.focus();
      floatValidation(firstValueRef, value);
    } else if (secondValueRef.current) {
      secondValueRef.current.focus();
      floatValidation(secondValueRef, value);
    }
  }
};
