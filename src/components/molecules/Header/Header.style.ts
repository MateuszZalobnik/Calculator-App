import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  left: 10px;
  justify-content: justfiy;
  padding-bottom: 10px;
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.green};
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.xl};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 20px;

  &.active {
    border: 2px solid ${({ theme }) => theme.colors.green};
  }

  ${({ theme }) => theme.mq.desktop} {
    width: 70px;
    height: 70px;
  }
`;