import React from 'react';
import styled from 'styled-components';
interface Props {
  light?: boolean;
  value: string | number;
}

const Wrapper = styled.button<Props>`
  background-color: ${(props) =>
    props.light == true
      ? props.theme.colors.secondary
      : props.theme.colors.darkBlue};
  color: ${(props) =>
    props.light == true
      ? props.theme.colors.darkBlue
      : props.theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSize.l};
  ${(props) =>
    props.value == '='
      ? 'grid-column-start: 4; grid-row-start: 3; grid-row-end: 6;'
      : null}
  font-weight: ${({ theme }) => theme.fontWeight.s};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.s};
  cursor: pointer;
  border-right: 1px solid ${({ theme }) => theme.colors.black};
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.mq.desktop} {
    padding: 10px;
  }
`;

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
