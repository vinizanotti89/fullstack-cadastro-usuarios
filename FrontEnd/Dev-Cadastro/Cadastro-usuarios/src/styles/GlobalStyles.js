import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Roboto", sans-serif;
    }
    
    html, body, #root {
        min-height: 100%;
        background-color: #3c3c3c;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        
    }
    
    `