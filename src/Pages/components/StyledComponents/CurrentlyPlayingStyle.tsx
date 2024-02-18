import styled from "styled-components";

const CurrentlyPlayingStyled = styled.div`
  grid-area: current;
  background-color: rgb(36, 36, 36);
  display: grid;
  grid-template: 1fr / 50px 100px 200px 1fr 250px 50px;
  grid-template-areas: ". albumCover albumInfo playerControls playerControlButtons .";
  .songAlbumCover {
    grid-area: albumCover;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
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
    grid-area: playerControls;
  }

  .playerControlButtons{
    grid-area: playerControlButtons;
    display: grid;
    grid-template: 20px 1fr 1fr 20px / 1fr 1fr;
    grid-template-areas:
    ". ."
    "playerDevices playerQueue"
    "playerVolume playerVolume"
    ". ."
  }

  .playerVolume{
    grid-area: playerVolume;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .playerVolume[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    width: 15rem;
  }

  /***** Track Styles *****/
  /***** Chrome, Safari, Opera, and Edge Chromium *****/
  .playerVolume[type="range"]::-webkit-slider-runnable-track {
    background: rgba(248, 237, 255, 0.2);
    height: 0.4rem;
    border-radius: 3px;
  }

  /******** Firefox ********/
  .playerVolume[type="range"]::-moz-range-track {
    background: rgba(248, 237, 255, 0.2);
    height: 0.4rem;
    border-radius: 3px;
  }

  /***** Thumb Styles *****/
  /***** Chrome, Safari, Opera, and Edge Chromium *****/
  .playerVolume[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    margin-top: -7px; /* Centers thumb on the track */
    background-color: rgba(150, 150, 150, 1);
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 50%;
  }
`;

export default CurrentlyPlayingStyled;
