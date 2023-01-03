import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  padding: 5px;
  margin-top: 15px;
  border-radius: ${({ theme }) => theme.borderRadius.s};
`;

interface ExpressionProps {
  length: number;
}

export const ExpressionWrapper = styled.div<ExpressionProps>`
  display: flex;
  justify-content: end;
  font-weight: ${({ theme }) => theme.fontWeight.s};
  text-align: right;
  font-size: ${({ length, theme }) => {
    if (length > 20) {
      return theme.fontSize.xs;
    } else if (length > 10) {
      return theme.fontSize.s;
    } else {
      return theme.fontSize.m;
    }
  }};
  ${({ theme }) => theme.mq.smartphone} {
    font-size: ${({ length, theme }) => {
      if (length > 15) {
        return theme.fontSize.m;
      } else if (length > 10) {
        return theme.fontSize.s;
      } else {
        return theme.fontSize.m;
      }
    }};
  }
  ${({ theme }) => theme.mq.tablet} {
    font-size: ${({ theme }) => theme.fontSize.l};
  }
`;

export const DateWrapper = styled.div`
  display: flex;
  justify-content: justify;
  color: ${({ theme }) => theme.colors.grey};
  font-size: ${({ theme }) => theme.fontSize.xs};

  ${({ theme }) => theme.mq.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

interface ResultProps {
  length: number;
}

export const ResultWrapper = styled.div<ResultProps>`
  display: flex;
  justify-content: space-between;
  font-weight: ${({ theme }) => theme.fontWeight.l};
  font-size: ${({ length, theme }) => {
    if (length > 20) {
      return theme.fontSize.s;
    } else if (length > 10) {
      return theme.fontSize.m;
    }
  }};
  ${({ theme }) => theme.mq.smartphone} {
    font-size: ${({ length, theme }) => {
      if (length > 15) {
        return theme.fontSize.l;
      } else if (length > 20) {
        return theme.fontSize.m;
      } else {
        return theme.fontSize.l;
      }
    }};
  }
  ${({ theme }) => theme.mq.tablet} {
    font-size: ${({ theme }) => theme.fontSize.l};
  }
  ${({ theme }) => theme.mq.desktop} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

export const RemoveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.darkBlue};
  border: none;
  color: ${({ theme }) => theme.colors.red};
  margin-right: 0px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.s};
  ${({ theme }) => theme.mq.tablet} {
    margin-right: 10px;
    font-size: ${({ theme }) => theme.fontSize.m};
  }
  :hover {
    color: ${({ theme }) => theme.colors.darkRed};
  }
`;
