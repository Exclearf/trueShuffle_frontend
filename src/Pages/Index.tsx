import { useEffect, useState } from "react";
import Playlists from "./components/Playlists";
import Search from "./components/Search";
import CurrentlyPlaying from "./components/CurrentlyPlaying";
import SettingsPage from "./components/SettingsPage";

import IndexStyled from "./StyledPages/IndexStyled";

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
const Index = ({ token }) => {
  const [player, setPlayer] = useState<any>(undefined);
  const [is_paused, setPaused] = useState(false);
  const [, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [longStyle, setLongStyle] = useState(true);
  const [playlists, setPlaylists] = useState<playlist[]>();
  const [searchInput, setSearchInput] = useState("");

  const settingItems = [
    {
      name: "Display as rows ",
      handler: setLongStyle,
    },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();

      const fetchPlaylists = async () => {
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
          //throw "There has been an issue with the token";
          return;
        }

        const playlists = await response.json();
        const formattedPlaylists: playlist[] = playlists.items.map(
          (playlist: any) => ({
            name: playlist.name,
            author: playlist.owner.display_name,
            image: playlist.images[0]?.url || "",
          })
        );
        setPlaylists(formattedPlaylists);
      };

      fetchPlaylists();
    };
  }, [token]);

  return (
    <IndexStyled>
      <Search setSearchInput={setSearchInput} searchInput={searchInput} />
      <Playlists
        playlists={
          searchInput
            ? playlists?.filter((playlist: playlist) =>
                playlist.name.toLowerCase().includes(searchInput.toLowerCase())
              )
            : playlists
        }
        longStyle={longStyle}
      />
      <SettingsPage settingItems={settingItems} />
      <CurrentlyPlaying
        currentTrack={current_track}
        player={player}
        isPaused={is_paused}
      />
    </IndexStyled>
  );
};

export default Index;
