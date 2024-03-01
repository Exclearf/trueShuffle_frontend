import LogInWrapper from "./StyledPages/LogInStyled";

import logo from "../Resources/other/spotifyLogo.png";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=77f685e7f75347a08e71369bd8eef061&response_type=code&redirect_uri=https://encape.me&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-private%20playlist-modify-public%20user-read-currently-playing%20user-read-email%20playlist-read-private`;

//@ts-ignore
const LogIn = () => {
  return (
    <LogInWrapper>
      <a href={AUTH_URL}>
        <img
          height="300px"
          width="300px"
          className="logIn-btn"
          src={logo}
          alt="My Happy SVG"
        />
      </a>
    </LogInWrapper>
  );
};

export default LogIn;
