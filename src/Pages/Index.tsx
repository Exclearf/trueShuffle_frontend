import Playlists from "./components/Playlists";
import Search from "./components/Search";
import CurrentlyPlaying from "./components/CurrentlyPlaying";
import SettingsPage from "./components/SettingsPage";
import { useEffect, useState } from "react";

import IndexStyled from "./StyledPages/IndexStyled";

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

  const settingItems = [
    {
      name: "Display as rows ",
      handler: setLongStyle,
    },
    {
      name: "Display as rows ",
      handler: setLongStyle,
    },
    {
      name: "Display as rows ",
      handler: setLongStyle,
    },
    {
      name: "Display as rows ",
      handler: setLongStyle,
    },
    {
      name: "Display as rows ",
      handler: setLongStyle,
    },
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
    };
  }, [token]);

  return (
    <IndexStyled>
      <Search />
      <Playlists
        playlists={Array(10).fill(playlistsList).flat()}
        longStyle={longStyle}
      />
      <SettingsPage settingItems={settingItems} />
      {current_track.name !== "" ? (
        <CurrentlyPlaying
          currentTrack={current_track}
          player={player}
          isPaused={is_paused}
        />
      ) : (
        <></>
      )}
    </IndexStyled>
  );
};

export default Index;
const playlistsList = [
  {
    name: "O kurwa AM",
    author: "O kurwa Arctic Monkeys",
    image:
      "https://i.pinimg.com/originals/d8/b4/0d/d8b40d4be24986da9cace0c6f2be3cb0.jpg",
  },
  {
    name: "O kurwa The Car",
    author: " Arctic Monkeys",
    image:
      "https://imgb.ifunny.co/images/8048754e5027a976a860c24a1955b508064942822f4cd0ce898f2757e40e0dbd_1.jpg",
  },
  {
    name: "O kurwa The Colour and the Shape",
    author: "Foo Fighters",
    image:
      "https://upload.wikimedia.org/wikipedia/en/0/0d/FooFighters-TheColourAndTheShape.jpg",
  },
  {
    name: "O kurwa In Rainbows",
    author: "Radiohead",
    image:
      "https://media.pitchfork.com/photos/5929b2fe9d034d5c69bf4c59/1:1/w_450%2Cc_limit/7055fb4d.jpg",
  },
];
