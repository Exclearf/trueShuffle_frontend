import styled from "styled-components";

const PlaylistStyled = styled.div`
  grid-area: content;
  color: white;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(36, 36, 36);
    border-radius: 15px;
  }
  &::-webkit-scrollbar-thumb:active {
    background-color: rgba(248, 237, 255, 0.5);
  }

  #playlistHeader {
    grid-template-areas: "exitButton title title album dateAdded duration";

    .exitButton {
      width: 40px;
      height: 30px;
      grid-area: exitButton;
    }

    .title {
      grid-area: title;
    }

    .album {
      grid-area: album;
    }

    .dateAdded {
      grid-area: dateAdded;
    }

    .duration {
      width: 50px;
      height: 30px;
      grid-area: duration;
    }
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

  .track {
    margin: 0px 10px 0px 0px;
    display: grid;
    grid-template: auto / 40px 50px 2fr 1fr 1fr 50px;
    gap: 15px;
    align-items: center;
    justify-items: left;
    color: white;

    .number {
      width: 40px;
      height: 40px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;

      .pausePlayButton {
        display: none;
      }

      .pausePlayText {
        display: block;
      }
    }

    .number:hover {
      color: transparent;

      .pausePlayText {
        display: none;
      }

      .pausePlayButton {
        width: 30px;
        height: 30px;
        display: block;
      }
    }
    .imageCover {
      img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
      }
    }
    .trackInfo {
      width: 100%;
    }
    .trackDuration {
      width: 100%;
      display: block;
      text-align: center;
    }
  }
`;

export default PlaylistStyled;
