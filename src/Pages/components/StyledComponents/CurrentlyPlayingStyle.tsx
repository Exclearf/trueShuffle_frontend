import styled from "styled-components";

const CurrentlyPlayingStyled = styled.div`
  grid-area: current;
  background-color: rgb(36, 36, 36);
  display: grid;
  grid-template: 1fr / 50px 100px 300px 1fr 250px 50px;
  grid-template-areas: ". albumCover albumInfo playerControls playerControlButtons .";
  outline: none;

  .songAlbumCover {
    grid-area: albumCover;

    img {
      width: 100px;
      height: 100px;
    }
  }

  .songInformation {
    margin: 0px 0px 0px 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: left;
    flex-direction: column;
    grid-area: albumInfo;
    color: #ebe1e1;
    gap: 10px;

    .songName {
      font-size: 1.5rem;
    }

    .songAuthor {
      font-size: 1.1rem;
    }
  }

  .playerControls {
    grid-area: playerControls;
  }

  .playPauseButton{
    width: 70px !important;
    height: 70px !important;
  }

  .icon {
    width: 50px;
    height: 50px;
    background-size: contain;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    filter: invert(70%) sepia(10%) saturate(10%) hue-rotate(318deg)
      brightness(84%) contrast(81%);
  }

  .playerControlButtons {
    grid-area: playerControlButtons;
    display: grid;
    grid-template:
      ". . ." 20px
      ". playerDevices playerQueue" 1fr
      "playerVolume playerVolume playerVolume" 1fr
      ". . ." 20px /
      1fr 1fr 1fr;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .playerDevices {
    grid-area: playerDevices;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .devicesDropdown {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    width: 200px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }

  .deviceItem {
    padding: 10px;
    cursor: pointer;
  }
  
  .playerDevices:hover .devicesDropdown {
    display: block;
  }

  .playerQueue {
    grid-area: playerQueue;
    width: 100%;
  }

  .playerVolumeButton {
    grid-area: playerVolumeButton;
  }

  .playerVolumeInput {
    grid-area: playerVolumeInput;
  }

  .playerVolume {
    display: grid;
    grid-area: playerVolume;
    grid-template: 1fr / 1fr 1fr 1fr;
    grid-template-areas: "playerVolumeButton playerVolumeInput playerVolumeInput";
  }

  .playerVolumeInput[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    width: 100%;
  }

  /***** Track Styles *****/
  /***** Chrome, Safari, Opera, and Edge Chromium *****/
  .playerVolumeInput[type="range"]::-webkit-slider-runnable-track {
    background: rgba(248, 237, 255, 0.2);
    height: 0.4rem;
    border-radius: 3px;
  }

  /******** Firefox ********/
  .playerVolumeInput[type="range"]::-moz-range-track {
    background: rgba(248, 237, 255, 0.2);
    height: 0.4rem;
    border-radius: 3px;
  }

  /***** Thumb Styles *****/
  /***** Chrome, Safari, Opera, and Edge Chromium *****/
  .playerVolumeInput[type="range"]::-webkit-slider-thumb {
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
