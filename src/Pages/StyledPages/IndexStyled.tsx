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

  .icon {
    width: 50px;
    height: 50px;
    background-size: contain;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    //transition: filter ease-in-out 100ms;
    filter: invert(70%) sepia(10%) saturate(10%) hue-rotate(318deg)
      brightness(84%) contrast(81%);
  }

  .iconClickable:hover {
    filter: invert(83%) sepia(3%) saturate(3927%) hue-rotate(206deg)
      brightness(115%) contrast(101%);
    opacity: 0.75;
  }
`;

export default IndexStyled;
