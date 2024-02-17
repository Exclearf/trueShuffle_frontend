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
    </CurrentlyPlayingStyled>
  );
};

export default CurrentlyPlaying;
