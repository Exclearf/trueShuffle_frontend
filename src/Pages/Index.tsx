import Playlists from "./components/Playlists";
import Search from "./components/Search";
import CurrentlyPlaying from "./components/CurrentlyPlaying";
import SettingsPage from "./components/SettingsPage";
import IndexStyled from "./StyledPages/IndexStyled";

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
  {
    name: "O kurwa Ants from Up There",
    author: "The Black Country, New Road",
    image:
      "https://upload.wikimedia.org/wikipedia/en/d/d7/Ants_from_Up_There_-_Black_Country%2C_New_Road.jpg",
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
  {
    name: "O kurwa Ants from Up There",
    author: "The Black Country, New Road",
    image:
      "https://upload.wikimedia.org/wikipedia/en/d/d7/Ants_from_Up_There_-_Black_Country%2C_New_Road.jpg",
  },
  {
    name: "O kurwa The Colour and the Shape",
    author: "Foo Fighters",
    image:
      "https://upload.wikimedia.org/wikipedia/en/0/0d/FooFighters-TheColourAndTheShape.jpg",
  },
];

//@ts-ignore
const Index = ({ exitHandler }) => {
  return (
    <IndexStyled>
      <Search />
      <Playlists playlists={playlistsList} />
      <SettingsPage />
      <CurrentlyPlaying />
    </IndexStyled>
  );
};

export default Index;
