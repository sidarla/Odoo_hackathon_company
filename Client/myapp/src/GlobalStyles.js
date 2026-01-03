import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #FF6B6B;
    --secondary: #4ECDC4;
    --dark: #292F36;
    --light: #F7FFF7;
    --accent: #FFE66D;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--light);
    color: var(--dark);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }
`;

export default GlobalStyles;
