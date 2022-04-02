import { createGlobalStyle } from "styled-components";

export const GlobalTheme = createGlobalStyle`

  body {
    height: 100%;
    width: 100%;
    background-color: ${(props) => props.theme.backgrounds.primary.default};
    color: ${(props) => props.theme.colors.primary};
    margin: 0;
    font-family: Roboto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
    
  }

  *{
    outline: 0;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    border:0;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .icons {
    font-family: "Material Icons";
    font-weight: normal;
    font-style: normal;
    font-size: 24px; /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: "liga";
  }


`;
