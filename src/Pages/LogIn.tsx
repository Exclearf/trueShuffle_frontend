import LogInWrapper from "./StyledPages/LogInStyled";
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=77f685e7f75347a08e71369bd8eef061&response_type=code&redirect_uri=https://encape.me&scope=user-library-read&user-read-currently-playing&streaming&user-read-email&user-read-private&web-playback";

//@ts-ignore
const LogIn = () => {
  return (
    <LogInWrapper>
      <a href={AUTH_URL}>
        <img
          height="300px"
          width="300px"
          className="logIn-btn"
          src="../Resources/svg/spotify-logo.svg"
          alt="My Happy SVG"
        />
      </a>
    </LogInWrapper>
  );
};

export default LogIn;
