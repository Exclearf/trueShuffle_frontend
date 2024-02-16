import styled from "styled-components";
//Main style
const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85 vh 15 vh;
  .spotify_body {
    display: grid;
    grid-template-columns: 15 vw 85 vw;
    height: 100%;
    width: 100%;
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;

    }
  }
  
  `;

export default Container;