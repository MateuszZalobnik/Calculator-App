import React from 'react';
import styled from 'styled-components';
import {
  Calculator as CalculatorIcon,
  ClockHistory,
} from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  left: 10px;
  justify-content: justfiy;
  padding-bottom: 10px;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.xl};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 20px;

  &.active {
    border: 2px solid ${({ theme }) => theme.colors.secondary};
  }

  ${({ theme }) => theme.mq.desktop} {
    width: 70px;
    height: 70px;
  }
`;

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
