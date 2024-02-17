import styled from "styled-components";

const CurrentlyPlayingStyled = styled.div`
  grid-area: current;
  background-color: red;
  display: grid;
  grid-template: 1fr / 100px 200px 1fr;
  grid-template-areas: "albumCover albumInfo albumControls";
  .songAlbumCover {
    grid-area: albumCover;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width: 100px;
        height: 100px;
    }
  }
  .songInformation {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    grid-area: albumInfo;
  }
  .playerControls {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: albumControls;
  }
`;

export default CurrentlyPlayingStyled;
