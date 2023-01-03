import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px 20px 0px 20px;
  min-height: 50vh;
  ${({ theme }) => theme.mq.desktop} {
    padding: 15px 15px 10vh 15px;
    min-height: max-content;
  }
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const NumberInput = styled.input`
  width: 40%;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  color: ${({ theme }) => theme.colors.green};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  font-size: ${({ theme }) => theme.fontSize.l};
  border: none;
  :focus {
    outline: 2px solid ${({ theme }) => theme.colors.green};
  }
`;

export const SymbolInput = styled.input`
  width: 10%;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  color: ${({ theme }) => theme.colors.green};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  font-size: ${({ theme }) => theme.fontSize.l};
  text-align: center;
  border: none;
  :focus {
    outline: 2px solid ${({ theme }) => theme.colors.green};
  }
`;
interface ResultProps {
  length: number;
}
export const ResultWrapper = styled.div<ResultProps>`
  display: flex;
  margin-top: 5px;
  justify-content: space-between;
  font-size: ${({ length, theme }) => {
    if (length > 20) {
      return theme.fontSize.s;
    } else if (length > 10) {
      return theme.fontSize.m;
    } else {
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
        return theme.fontSize.m;
      }
    }};
 
    ${({ theme }) => theme.mq.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl};
`;
interface LastResultProps {
  length: number;
}
export const LastResultWrapper = styled.div<LastResultProps>`
  display: flex;
  margin-top: 5px;
  justify-content: end;
  font-size: ${({ length, theme }) => {
    if (length > 40) {
      return theme.fontSize.xs;
    } else {
      return theme.fontSize.m;
    }
  }};
  ${({ theme }) => theme.mq.smartphone} {
    font-size: ${({ length, theme }) => {
      if (length > 40) {
        return theme.fontSize.s;
      } else {
        return theme.fontSize.m;
      }
    }};
`;