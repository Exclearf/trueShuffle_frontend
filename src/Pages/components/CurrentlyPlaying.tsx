import { useEffect, useState } from "react";
import CurrentlyPlayingStyled from "./StyledComponents/CurrentlyPlayingStyle";

//! Icons import
//* Icons for volume controls of the Spotify player
import volumeOffIcon from "../../Resources/volume/volume-off.svg";
import volumeLowIcon from "../../Resources/volume/volume-low.svg";
import volumeMediumIcon from "../../Resources/volume/volume-medium.svg";
import volumeHighIcon from "../../Resources/volume/volume-high.svg";

//* Icons for queue and devices controls
import devicesIcon from "../../Resources/other/devices.svg";
import queueIcon from "../../Resources/other/queue.svg";

//* Icons for playback controls of the Spotify player
import playIcon from "../../Resources/controls/play.svg";
import pauseIcon from "../../Resources/controls/pause.svg";
import backwardIcon from "../../Resources/controls/backward.svg";
import forwardIcon from "../../Resources/controls/forward.svg";

const volumeIcons = [
  volumeOffIcon,
  volumeLowIcon,
  volumeMediumIcon,
  volumeHighIcon,
];

interface CurrentlyPlayingProps {
  currentTrack: {
    name: string;
    album: {
      images: { url: string }[];
    };
    artists: { name: string }[];
  };
  player: any;
  isPaused: boolean;
}

let prevValue: any = 0;

const CurrentlyPlaying: React.FC<CurrentlyPlayingProps> = ({
  currentTrack,
  player,
  isPaused,
}) => {
  const [volume, setVolume] = useState<number>(0);

  const changeVolume = (val: any) => {
    player.setVolume(val / 100);
    setVolume(val / 100);
  };
  const mutePlayer = () => {
    if (volume === 0) {
      setVolume(prevValue);
    } else {
      prevValue = volume;
      setVolume(0);
    }
  };

  useEffect(() => {
    player
      ?.getVolume()
      .then((val: number) => {
        setVolume(val * 100);
      })
      .catch(() => {});

    setVolume(0.5);
  }, [player]);

  return (
    <CurrentlyPlayingStyled>
      <div className="songAlbumCover center">
        <img src={currentTrack.album.images[0].url} alt=""></img>
      </div>
      <div className="songInformation">
        <div className="songName">{currentTrack.name}</div>
        <div className="songAuthor">{currentTrack.artists[0].name}</div>
      </div>
      <div className="playerControls center">
        <button
          className="backwardButton icon"
          style={{
            backgroundImage: `url("${backwardIcon}")`,
          }}
          onClick={() => {
            player.previousTrack();
          }}
        />
        <button
          className="playPauseButton icon"
          style={{
            backgroundImage: `url("${isPaused ? playIcon : pauseIcon}")`,
          }}
          onClick={() => {
            player.togglePlay();
          }}
        />

        <button
          className="forwardButton icon"
          style={{
            backgroundImage: `url("${forwardIcon}")`,
          }}
          onClick={() => {
            player.nextTrack();
          }}
        />
      </div>
      <div className="playerControlButtons">
        <div
          className="playerDevices icon"
          style={{
            backgroundImage: `url("${devicesIcon}")`,
          }}
        />
        <div
          className="playerQueue icon"
          style={{
            backgroundImage: `url("${queueIcon}")`,
          }}
        />
        <div className="playerVolume">
          <button
            className="playerVolumeButton icon center"
            style={{
              backgroundImage: `url("${
                volume
                  ? volumeIcons[Math.floor(volume / 0.34) + 1]
                  : volumeIcons[0]
              }")`,
            }}
            onClick={mutePlayer}
          ></button>
          <input
            className="playerVolumeInput"
            type="range"
            min={"0"}
            max={"100"}
            value={volume * 100}
            onChange={(e) => changeVolume(e.target.value)}
          />
        </div>
      </div>
    </CurrentlyPlayingStyled>
  );
};

export default CurrentlyPlaying;
