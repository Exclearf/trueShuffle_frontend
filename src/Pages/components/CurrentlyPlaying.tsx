import React from "react";
import CurrentlyPlayingStyled from "./StyledComponents/CurrentlyPlayingStyle";

function CurrentlyPlaying() {
  return (
    <CurrentlyPlayingStyled>
      <div className="songAlbumCover"><img src="./Resources/test.png"></img></div>
      <div className="songInformation">
        <div className="songName">Name</div>
        <div className="songAlbum">Album</div>
      </div>
      <div className="playerControls">controls</div>
    </CurrentlyPlayingStyled>
  );
}

export default CurrentlyPlaying;
