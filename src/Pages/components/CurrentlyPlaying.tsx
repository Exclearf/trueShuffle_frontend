import { useEffect, useState } from "react";
import CurrentlyPlayingStyled from "./StyledComponents/CurrentlyPlayingStyle";

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

  useEffect(() => {
    //player.getVolume().then((val: number) => {
    //  setVolume(val * 100);
    //}).catch(() => {});

    setVolume(0.5);
  }, [player]);

  return (
    <CurrentlyPlayingStyled>
      <div className="songAlbumCover">
        <img src={currentTrack.album.images[0].url} alt=""></img>
      </div>
      <div className="songInformation">
        <div className="songName">{currentTrack.name}</div>
        <div className="songAuthor">{currentTrack.artists[0].name}</div>
      </div>
      <div className="playerControls">
        <button
          className="btn-spotify"
          onClick={() => {
            player.previousTrack();
          }}
        >
          &lt;&lt;
        </button>

        <button
          className="btn-spotify"
          onClick={() => {
            player.togglePlay();
          }}
        >
          {isPaused ? "PLAY" : "PAUSE"}
        </button>

        <button
          className="btn-spotify"
          onClick={() => {
            player.nextTrack();
          }}
        >
          &gt;&gt;
        </button>
      </div>
      <div className="playerControlButtons">
        <div className="playerDevices">D</div>
        <div className="playerQueue">Q</div>
        <div className="playerVolume">
        <button className="playerVolumeButton"/>
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
