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
      border-radius: 6px;
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
    gap: 10px;

    .songName {
      color: rgba(235, 225, 225, 1);
      font-size: 1.5rem;
    }

    .songAuthor {
      color: rgba(235, 225, 225, 0.75);
      font-size: 1.1rem;
    }
  }

  .playerControls {
    grid-area: playerControls;
  }

  .playPauseButton {
    width: 70px !important;
    height: 70px !important;
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

  .deviceItem {
    padding: 10px;
    cursor: pointer;
  }

  .Dropdown {
    position: absolute;
    background-color: rgb(36, 36, 36);
    width: 200px;
    max-height: 300px;
    z-index: 3;
    /* change for smth more scalable */
    margin-bottom: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    
    p {
      color: rgba(235, 225, 225, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 25px;
    }
     
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(248, 237, 255, 0.3);
      border-radius: 15px;
    }

    &::-webkit-scrollbar-thumb:active {
      background-color: rgba(248, 237, 255, 0.5);
    }
  }

  .DeviceButton {
    margin-left: 3px;
    color: rgba(235, 225, 225, 0.75);
    position: flex;
    width: 195px;
    height: 50px;
    margin-top: 10px;
    background-color: #171616;
  }

  .DeviceButton:hover {
    background-color: rgba(248, 237, 255, 0.3);

    .DeviceInfo {
      color: rgba(235, 225, 225, 1);
    }
  }

  .DeviceBtnLayout {
    display: flex;
  }

 

  .DeviceIcon {
    flex: 30%;
    height: 35px;
  }

  .DeviceInfo {
    flex: 70%;
    display: flex;
    flex-direction: column;
    margin-top: 7px;
  }

  .DeviceName {
    font-size: 12px;
    margin-bottom: 7px;
  }

  .DeviceStatus {
    font-size: 10px;
  }

  .playerQueue {
    grid-area: playerQueue;
    width: 100%;
    position: relative;

    .background {
      width: 100px;
    }

    .playerQueuePopUp {
      display: block;
      color: white;
      position: absolute;
      bottom: 30px;
      left: -50px;
      margin: auto;
      background-color: transparent;
      height: 0px;
      width: 200px;
      overflow: hidden;
      border-radius: 6px;
      display: flex;
      justify-content: start;
      align-items: start;
      flex-direction: column;
      transition: 500ms all;

      .popUpContent {
        height: 330px;
        position: absolute;
        bottom: 0px;
        z-index: 1;
        width: 100%;

        .current {
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px 0px 0px 4px;

          .currentName {
            font-size: 1.3rem;
            color: rgba(235, 225, 225, 1);
            display: block;
            white-space: nowrap;
            text-align: left;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .queue {
          height: 200px;
          overflow-y: scroll;
          overflow-x: hidden;
          z-index: 2;
          padding: 5px 3px 5px 3px;

          .queueItem {
            background: #171616;
            height: 35px;
            margin: 3px 0px 3px 0px;
            border-radius: 6px;
            padding: 0px 0px 0px 5px;
            display: flex;
            align-items: center;
            justify-content: start;

            .queueItemName {
              color: rgba(235, 225, 225, 0.75);
              display: block;
              white-space: nowrap;
              text-align: left;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
              width: 100%;
              font-size: 1.1rem;
            }
          }

          .queueItem:hover {
            background-color: rgba(248, 237, 255, 0.3);

            .queueItemName {
              color: rgba(235, 225, 225, 1);
            }
          }

          &::-webkit-scrollbar {
            width: 8px;
          }

          &::-webkit-scrollbar-track {
            background: transparent;
          }

          &::-webkit-scrollbar-thumb {
            background: rgba(248, 237, 255, 0.3);
            border-radius: 15px;
          }
          &::-webkit-scrollbar-thumb:active {
            background-color: rgba(248, 237, 255, 0.5);
          }
        }

        .placeholder {
          background-color: transparent;
          height: 80px;
          width: 100px;
        }
      }
    }
    .playerQueuePopUp::before {
      position: absolute;
      content: "";
      bottom: 60px;
      left: 0px;
      right: 0px;
      margin: auto;
      width: 100%;
      height: 270px;
      border-radius: 6px;
      background-color: rgb(36, 36, 36);
    }

    .playerQueuePopUp::after {
      position: absolute;
      content: "";
      bottom: -230px;
      left: 0px;
      right: 0px;
      margin: auto;
      width: 0px;
      height: 270px;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-top: 20px solid rgb(36, 36, 36);
    }

    .playerQueuePopUpHover {
      height: 250px;
      padding: 0px 0px 80px 0px;
    }
  }

  .playerQueuePopUpHoverable:hover {
    .playerQueuePopUp {
      height: 250px;
      padding: 0px 0px 80px 0px;
    }
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
