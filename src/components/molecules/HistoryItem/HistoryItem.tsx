import { firebase } from 'consts/firebaseConsts';
import useFirestore from 'hooks/useFirestore/useFirestore';
import React, { useState, useEffect } from 'react';
import { XCircle } from 'react-bootstrap-icons';
import { DateWrapper, ExpressionWrapper, RemoveButton, ResultWrapper, Wrapper } from './HistoryItem.style';


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
