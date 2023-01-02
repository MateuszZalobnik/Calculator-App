import React from 'react';
import { Wrapper } from './Button.style';

const Button: React.FC<{
  value: string | number;
  light?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ light = false, value, onClick }) => {
  return (
    <Wrapper onClick={onClick} light={light} value={value}>
      {value}
    </Wrapper>
  );
};

export default Button;
