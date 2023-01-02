import React from 'react';
import { GlobalStyle } from 'assets/styles/GlobalStyles';
import { theme } from 'assets/styles/theme';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import Calculator from 'components/organisms/Calculator/Calculator';
import Header from 'components/molecules/Header/Header';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from 'components/organisms/HomePage/HomePage';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: end;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  ${({ theme }) => theme.mq.desktop} {
    align-items: center;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.green};
  ${({ theme }) => theme.mq.desktop} {
    width: 50%;
  }
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
              <Route path="/" element={<HomePage />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </ContentWrapper>
        </Wrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
