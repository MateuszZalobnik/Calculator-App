import React from 'react';
import {
  Calculator as CalculatorIcon,
  ClockHistory,
} from 'react-bootstrap-icons';
import { StyledNavLink, Wrapper } from './Header.style';


const Header: React.FC = () => {
  return (
    <Wrapper>
      <StyledNavLink
        to="/"
        className={({ isActive }) => (isActive ? 'active' : undefined)}
      >
        <ClockHistory />
      </StyledNavLink>
      <StyledNavLink
        to="/calculator"
        className={({ isActive }) => (isActive ? 'active' : undefined)}
      >
        <CalculatorIcon />
      </StyledNavLink>
    </Wrapper>
  );
};

export default Header;
