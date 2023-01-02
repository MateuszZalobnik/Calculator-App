import React, { RefObject } from 'react';
import { Wrapper } from './Button.style';

const Button: React.FC<{
  Ref?: RefObject<HTMLButtonElement>;
  value: string | number;
  light?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ light = false, value, onClick, Ref }) => {
  return (
    <Wrapper onClick={onClick} light={light} value={value} ref={Ref}>
      {value}
    </Wrapper>
  );
};

export default Button;
