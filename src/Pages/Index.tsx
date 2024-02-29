import { useContext, useEffect, useState } from "react";
import Playlists from "./components/Playlists";
import Search from "./components/Search";
import CurrentlyPlaying from "./components/CurrentlyPlaying";
import SettingsPage from "./components/SettingsPage";

import IndexStyled from "./StyledPages/IndexStyled";

import likedCoverImg from "../Resources/other/likedCover.png";
import Playlist from "./components/Playlist";

import { TokenContext } from "../Contexts/TokenContext";
import { usePlaybackStateChanged } from "../hooks/usePlaybackStateChanged";
import InfoPage from "./components/InfoPage";
import { useInfoPage } from "../hooks/useInfoPage";

export interface playlist {
  name: string;
  author: string;
  image: string;
}

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

//@ts-ignore
const Index = () => {
  const token = useContext(TokenContext);
  const [player, setPlayer] = useState<any>(undefined);
  const [is_paused, setPaused] = useState(false);
  const [, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [longStyle, setLongStyle] = useState(true);
  const [queueHoverable, setQueueHoverable] = useState(true);
  const [playlists, setPlaylists] = useState<playlist[]>();
  const [playlistHref, setPlaylistHref] = useState<string>("");
  const [searchInputPlaylists, setSearchInputPlaylists] = useState("");
  const [searchInputPlaylist, setSearchInputPlaylist] = useState("");
  const [currentlyPlayingPlaylist, setCurrentlyPlayingPlaylist] = useState<string>("")
  const [isInfoPageOpen, closeInfoPage] = useInfoPage();
  const [, , updateMethods] = usePlaybackStateChanged();

  window.addEventListener("beforeunload", function (e) {
    player?.disconnect();
  });

  const settingItems = [
    {
      name: "Display as rows ",
      handler: setLongStyle,
    },
    {
      name: "Make queue button hoverable ",
      handler: setQueueHoverable,
    },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "True Shuffle",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });
      player.addListener("ready", async ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        await fetch("https://api.spotify.com/v1/me/player", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            device_ids: [device_id],
            play: false,
          }),
        });
        setPlayer(player);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
        player?.disconnect();
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);
        updateMethods();

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player?.connect();

      const fetchPlaylists = async () => {
        type Playlist = {
          name: string;
          author: string;
          image: string;
          href: string;
        };
        const response = await fetch(
          "https://api.spotify.com/v1/me/playlists",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          return;
        }

        const playlists = await response.json();
        const formattedPlaylists: Playlist[] = playlists.items.map(
          (playlist: any) => ({
            name: playlist.name,
            author: playlist.owner.display_name,
            image: playlist.images[0]?.url || "",
            href: playlist.href,
          })
        );

        const likedSongsPlaylist = {
          name: "Liked Songs",
          author: "You :)",
          image: `${likedCoverImg}`,
          href: "https://api.spotify.com/v1/me/tracks",
        };

        const combinedItems = [likedSongsPlaylist, ...formattedPlaylists];

        setPlaylists(combinedItems);
      };

      fetchPlaylists();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <IndexStyled>
      {isInfoPageOpen() && <InfoPage closeHandler={closeInfoPage} />}
      <Search
        setSearchInput={
          playlistHref ? setSearchInputPlaylist : setSearchInputPlaylists
        }
        searchInput={playlistHref ? searchInputPlaylist : searchInputPlaylists}
      />
      {playlistHref ? (
        <Playlist
          playlistHref={playlistHref}
          setPlaylistHref={setPlaylistHref}
          player={player}
          searchPrompt={searchInputPlaylist}
          setCurrentlyPlayingPlaylist={setCurrentlyPlayingPlaylist}
        />
      ) : (
        <Playlists
          changePlaylist={setPlaylistHref}
          playlists={
            searchInputPlaylists
              ? playlists?.filter((playlist: playlist) =>
                  playlist.name
                    .toLowerCase()
                    .includes(searchInputPlaylists.toLowerCase())
                )
              : playlists
          }
          longStyle={longStyle}
        />
      )}
      <SettingsPage settingItems={settingItems} />
      <CurrentlyPlaying
        currentTrack={current_track}
        player={player}
        isPaused={is_paused}
        isQueuePopUpHoverable={queueHoverable}
        currentlyPlayingPlaylist={currentlyPlayingPlaylist}
      />
    </IndexStyled>
  );
};

export default Index;
