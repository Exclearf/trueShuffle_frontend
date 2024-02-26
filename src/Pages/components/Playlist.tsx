import React, { useContext, useEffect, useReducer, useState } from "react";
import PlaylistStyled from "./StyledComponents/PlaylistStyled";
import { TokenContext } from "../../Contexts/TokenContext";

import pausePlayIcon from "../../Resources/other/play-pause.svg";
import durationIcon from "../../Resources/other/duration.svg";
import backIcon from "../../Resources/other/back.svg";

interface PlaylistProps {
  playlistHref: string;
  setPlaylistHref: any;
  player: any;
  searchPrompt: string;
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
  player,
  searchPrompt,
}) => {
  const token = useContext(TokenContext);
  const [tracks, setTracks] = useState<track[]>([]);

  console.log("Fetching tracks");

  const playTrack = async (uri: any) => {
    const isCurrentTrack = (
      await (
        await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).json()
    ).item.uri;
    if (isCurrentTrack === uri) {
      player?.togglePlay();
    } else {
      await fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uris: [uri],
        }),
      });
    }
  };
  let currentTracks: any = [];
  useEffect(() => {
    const fetchPlaylist: any = async (
      currentOffset: any,
      defaultLimit: any
    ) => {
      window.addEventListener("beforeunload", function (e) {
        return;
      });
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
        return body.tracks.items?.map((item: any) => item.track);
      } else {
        currentTracksBatch = body.items?.map((item: any) => {
          let currentItem = item.track;
          currentItem["added_at"] = new Date(item?.added_at).toLocaleDateString(
            navigator.languages === undefined
              ? navigator.language
              : navigator.languages[0],
            { year: "numeric", month: "short", day: "numeric" }
          );
          return currentItem;
        });
        if (currentTracksBatch?.length === 0) {
          console.log("Finished fetching tracks");
          return [];
        }
        currentTracks = [
          ...(currentTracks ?? []),
          ...(currentTracksBatch ?? []),
        ];
        setTracks(currentTracks);
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
      <div id="playlistHeader" className="track">
        <button
          className="exitButton icon"
          onClick={() => setPlaylistHref("")}
          style={{
            backgroundImage: `url("${backIcon}")`,
          }}
        />
        <div className="title">Title</div>
        <div className="album">Album</div>
        <div className="date">Date added</div>
        <div
          className="duration icon"
          style={{
            backgroundImage: `url("${durationIcon}")`,
          }}
        />
      </div>
      {tracks?.map(
        (track: any, index: number) =>
          (searchPrompt ? track.name.toLowerCase().includes(searchPrompt.toLowerCase()) : true) && (
            <div className="track">
              <div className="number icon">
                <div className="pausePlayText">{index + 1}</div>
                <div
                  className="pausePlayButton icon"
                  onClick={() => playTrack(track.uri)}
                  style={{ backgroundImage: `url("${pausePlayIcon}")` }}
                />
              </div>
              <div className="imageCover">
                <img src={track.album.images[0].url} />
              </div>
              <div className="trackInfo">
                <div className="trackName">{track.name}</div>
                <div className="trackAuthor">
                  {track.artists
                    .reduce((acc: any, curr: any) => acc + ", " + curr.name, "")
                    .slice(2)}
                </div>
              </div>
              <div className="trackAlbum">{track.album.name}</div>
              <div className="dateAdded">{track?.added_at}</div>
              <div className="trackDuration">
                {Math.floor(parseInt(track.duration_ms) / 60000)}:
                {((parseInt(track.duration_ms) / 1000) % 60)
                  .toFixed(0)
                  .padStart(2, "0")}
              </div>
            </div>
          )
      )}
    </PlaylistStyled>
  );
};

export default Playlist;
