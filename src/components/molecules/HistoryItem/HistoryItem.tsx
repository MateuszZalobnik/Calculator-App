import { db } from 'firebase-config/firebase-config';
import { deleteDoc, doc } from 'firebase/firestore';
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

const ExpressionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.colors.grey};
`;

const ResultWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

const RemoveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.darkBlue};
  border: none;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.colors.danger};
  margin-right: 10px;
  cursor: pointer;
`;

const HistoryItem: React.FC<{
  expression: string;
  result: string;
  seconds: number;
  id: string;
}> = ({ expression, result, seconds, id }) => {
  const [date, setDate] = useState('');

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
    await deleteDoc(doc(db, 'calculations', id));
  };

  useEffect(() => {
    displayData();
  }, []);

  return (
    <Wrapper>
      <ExpressionWrapper>
        <DateWrapper>
          <RemoveButton onClick={() => handleDelete(id)}>
            <XCircle />
          </RemoveButton>
          {date}
        </DateWrapper>
        {expression}
      </ExpressionWrapper>
      <ResultWrapper>
        <span>=</span>
        <span>{result}</span>
      </ResultWrapper>
    </Wrapper>
  );
};

export default HistoryItem;
