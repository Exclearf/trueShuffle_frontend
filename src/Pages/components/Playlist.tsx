import React, { useContext, useEffect, useState } from "react";
import PlaylistStyled from "./StyledComponents/PlaylistStyled";
import { TokenContext } from "../../Contexts/TokenContext";

interface PlaylistProps {
  playlistHref: string;
  setPlaylistHref: any;
}

type track = {
  name: "";
  album: {
    images: [{ url: "" }];
  };
  artists: [{ name: "" }];
};

const Playlist: React.FC<PlaylistProps> = ({
  playlistHref,
  setPlaylistHref,
}) => {
  const token = useContext(TokenContext);
  const [tracks, setTracks] = useState<track[]>();

  console.log("Fetching tracks");

  useEffect(() => {
    const fetchPlaylist: any = async (
      currentOffset: any,
      defaultLimit: any
    ) => {
      const response = await fetch(
        playlistHref + `?limit=${defaultLimit}&offset=${currentOffset}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const body = await response.json();
      let currentTracksBatch = null;
      if (body?.tracks?.items) {
        console.log("Finished fetching tracks");
        return (currentTracksBatch = body.tracks.items?.map(
          (item: any) => item.track
        ));
      } else {
        currentTracksBatch = body.items?.map((item: any) => item.track);
        if (currentTracksBatch.length === 0) {
          console.log("Finished fetching tracks");
          return [];
        }
        return currentTracksBatch.concat(
          await fetchPlaylist(currentOffset + defaultLimit, defaultLimit)
        );
      }
    };

    fetchPlaylist(0, 50).then((tracks: any) => setTracks(tracks));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistHref, token]);

  return (
    <PlaylistStyled>
      <button onClick={() => setPlaylistHref("")} />
      {tracks?.map((track: any) => (
        <div>{track.name}</div>
      ))}
    </PlaylistStyled>
  );
};

export default Playlist;
