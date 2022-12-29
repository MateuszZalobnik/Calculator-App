import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
  }
  
  *, *::after, *::before {
    box-sizing: inherit;
  }
  
  body {
    box-sizing: border-box;
    margin: 0;
    padding: 0px;
    font-family: 'Poppins', sans-serif;
  }
  
  a, button {
    font-family: 'Poppins', sans-serif;
  }
`;
