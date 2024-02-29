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
    background: #121212;
    grid-template-areas: "exitButton title title album dateAdded duration";
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 10px 0px 10px 0px;

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

  .track {
    margin: 0px 10px 0px 0px;
    background: #171616;
    transition: background-color ease-in-out 200ms;
    border-radius: 6px;
    display: grid;
    grid-template: auto / 40px 50px 2fr 1fr 1fr 50px;
    gap: 15px;
    padding: 0px 15px 0px 15px;
    align-items: center;
    justify-items: left;
    color: white;

    &:hover {
      background-color: #252525;
    }

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
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
      }
    }
    .trackInfo {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;


      .trackName{
        padding: 0px 0px 2px 0px;
        font-size: 1.1rem;
        color: rgba(235, 225, 225, 1);
      }
      .trackAuthor{
        padding: 2px 0px 0px 0px;
        font-size: 0.9rem;
        color: rgba(235, 225, 225, 0.75);
      }
    }
    .trackDuration {
      width: 100%;
      display: block;
      text-align: center;
    }
  }
`;

export default PlaylistStyled;
