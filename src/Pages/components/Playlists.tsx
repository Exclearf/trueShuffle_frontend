import {
  PlaylistsStyledLong,
  PlaylistsStyledShort,
} from "./StyledComponents/PlaylistsStyles";
import { playlist } from "../Index";
import React from "react";

interface playlistsProps {
  playlists: playlist[] | undefined;
  longStyle: boolean;
}

const Playlists: React.FC<playlistsProps> = ({ playlists, longStyle }) => {
  const StyledComponent = longStyle
    ? PlaylistsStyledLong
    : PlaylistsStyledShort;

  return (
    <>
      <StyledComponent>
        {playlists?.map((playlist: any, index: any) => (
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
};

export default Playlists;
