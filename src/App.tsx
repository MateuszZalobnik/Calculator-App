import React from 'react';
import { GlobalStyle } from 'assets/styles/GlobalStyles';
import { theme } from 'assets/styles/theme';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import Calculator from 'components/organisms/Calculator/Calculator';
import Header from 'components/molecules/Header/Header';
import { Routes, Route, Navigate } from 'react-router-dom';
import History from 'components/organisms/History/History';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.darkGrey};
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.secondary};
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Wrapper>
          <ContentWrapper>
            <Header />
            <Routes>
              <Route path="/" element={<Calculator />} />
              <Route path="/history" element={<History />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </ContentWrapper>
        </Wrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
