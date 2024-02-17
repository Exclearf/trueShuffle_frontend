import styled from "styled-components";

const IndexStyled = styled.div`
  background-color: inherit;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template: 1fr 7fr 1fr / 100px 1fr 100px;
  grid-template-areas: 
    ". search ."
    ". content settingsWheel"
    "current current current";
  `;

export default IndexStyled;