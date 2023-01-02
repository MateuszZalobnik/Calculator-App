import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 2px;
  display: grid;
  gap: 2px 2px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  height: 50vh;
  ${({ theme }) => theme.mq.desktop} {
    height: max-content;
    padding: 10px;
    gap: 5px 5px;
  }
`;