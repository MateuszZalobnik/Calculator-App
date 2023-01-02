import { firebase } from 'consts/firebaseConsts';
import useFirestore from 'hooks/useFirestore/useFirestore';
import React, { useState, useEffect } from 'react';
import { XCircle } from 'react-bootstrap-icons';
import styled from 'styled-components';

const Wrapper = styled.div`
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

const ExpressionWrapper = styled.div<ExpressionProps>`
  display: flex;
  justify-content: space-between;
  font-weight: ${({ theme }) => theme.fontWeight.s};

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

const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.grey};
  font-size: ${({ theme }) => theme.fontSize.xs};

  ${({ theme }) => theme.mq.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

interface ResultProps {
  length: number;
}

const ResultWrapper = styled.div<ResultProps>`
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

const RemoveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.darkBlue};
  border: none;
  color: ${({ theme }) => theme.colors.danger};
  margin-right: 0px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.s};
  ${({ theme }) => theme.mq.tablet} {
    margin-right: 10px;
    font-size: ${({ theme }) => theme.fontSize.m};
  }
`;

const HistoryItem: React.FC<{
  expression: string;
  result: string;
  seconds: number;
  id: string;
}> = ({ expression, result, seconds, id }) => {
  const [date, setDate] = useState('');
  const { deleteDocument } = useFirestore();
  const displayData = () => {
    const data = new Date(seconds * 1000);
    const dateString = data.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });
    setDate(dateString);
  };

  const handleDelete = async (id: string) => {
    deleteDocument(firebase.collections.calculations, id);
  };

  useEffect(() => {
    displayData();
  }, []);

  return (
    <Wrapper>
      <ExpressionWrapper length={result.length}>
        <DateWrapper>
          <RemoveButton onClick={() => handleDelete(id)}>
            <XCircle />
          </RemoveButton>
          {date}
        </DateWrapper>
        {expression}
      </ExpressionWrapper>
      <ResultWrapper length={result.length}>
        <span>=</span>
        <span>{result}</span>
      </ResultWrapper>
    </Wrapper>
  );
};

export default HistoryItem;
