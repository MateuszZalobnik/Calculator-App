import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  *, *::after, *::before {
    box-sizing: inherit;
  }
  
  body {
    box-sizing: border-box;
    margin: 0;
    padding: 0px;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  a, button {
    font-family: 'IBM Plex Mono', monospace;
  }
`;
