import {useState } from "react";
import PlaylistsStyled from "./StyledComponents/PlaylistsStyles";



//@ts-ignore
export default function Playlists({ playlists }) {
  return (
    <PlaylistsStyled>
      {playlists.map((playlist: any, index: any) => (
        <div key={index} className="playlist">
          <div className="playlist_cover">
            <img src={playlist.image} />
          </div>
          <div className="description">
            <p className="playlist_name">{playlist.name}</p>
            {/* If album - band name, if playlist - username, if spotify-generated - Spotify(?) */}
            <p className="playlist_author">{playlist.author}</p>
          </div>
        </div>
      ))}
    </PlaylistsStyled>
  );
}
