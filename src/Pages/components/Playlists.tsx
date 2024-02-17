import { useState, useEffect } from "react";
import { PlaylistsStyledLong, PlaylistsStyledShort } from "./StyledComponents/PlaylistsStyles";

//@ts-ignore
export default function Playlists({ playlists }) {
  const [longStyle, setLongStyle] = useState(true);

  useEffect(() => {
    setLongStyle(prevLongStyle => !prevLongStyle);
  }, [])

  useEffect(() => {
    console.log(longStyle ? "Long style activated" : "Short style activated");
  }, [longStyle]);

  // Determine which styled component to use based on longStyle
  const StyledComponent = longStyle ? PlaylistsStyledLong : PlaylistsStyledShort;

  return (
    <>
      <StyledComponent>
        {playlists.map((playlist: any, index: any) => (
          <div key={index} className="playlist">
            <div className="playlist_cover">
              <img src={playlist.image} alt="Playlist cover" />
            </div>
            <div className="description">
              <p className="playlist_name">{playlist.name}</p>
              <p className="playlist_author">{playlist.author}</p>
            </div>
          </div>
        ))}
      </StyledComponent>
    </>
  );
}