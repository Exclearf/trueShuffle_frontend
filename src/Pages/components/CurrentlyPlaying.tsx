import React, { useContext, useEffect, useState } from "react";
import CurrentlyPlayingStyled from "./StyledComponents/CurrentlyPlayingStyle";

//! Token context import for fetching devices
import { TokenContext } from "../../Contexts/TokenContext";

//! Icons import
//* Icons for volume controls of the Spotify player
import volumeOffIcon from "../../Resources/volume/volume-off.svg";
import volumeLowIcon from "../../Resources/volume/volume-low.svg";
import volumeMediumIcon from "../../Resources/volume/volume-medium.svg";
import volumeHighIcon from "../../Resources/volume/volume-high.svg";

//* Icons for queue and devices controls
import devicesIcon from "../../Resources/other/devices.svg";
import queueIcon from "../../Resources/other/queue.svg";

//* Icons for playback controls of the Spotify player
import playIcon from "../../Resources/controls/play.svg";
import pauseIcon from "../../Resources/controls/pause.svg";
import backwardIcon from "../../Resources/controls/backward.svg";
import forwardIcon from "../../Resources/controls/forward.svg";

const volumeIcons = [
  volumeOffIcon,
  volumeLowIcon,
  volumeMediumIcon,
  volumeHighIcon,
];

interface CurrentlyPlayingProps {
  currentTrack: {
    name: string;
    album: {
      images: { url: string }[];
    };
    artists: { name: string }[];
  };
  player: any;
  isPaused: boolean;
}

export interface device {
  id: string;
  name: string;
  type: string;
  volume_percent: number;
  is_active: boolean;
}

let prevValue: any = 0;

const CurrentlyPlaying: React.FC<CurrentlyPlayingProps> = ({
  currentTrack,
  player,
  isPaused,
}) => {
  const token = useContext(TokenContext);
  const [volume, setVolume] = useState<number>(0.5);
  const [devices, setDevices] = useState<device[]>();
  const [dropdown, setDropdown] = useState<boolean>(false);


  // hande device menu dropdown
  const toggleDevicesDropdown = () => {
    setDropdown(!dropdown);
  };

  const changeVolume = (val: any) => {
    if (player) {
      player.setVolume(val / 100);
      setVolume(val / 100);
    }
  };
  const mutePlayer = () => {
    if (volume === 0) {
      player?.setVolume(prevValue);
      setVolume(prevValue);
    } else {
      prevValue = volume;
      player?.setVolume(0);
      setVolume(0);
    }
  };

  useEffect(() => {
    player
      ?.getVolume()
      .then((val: number) => {
        setVolume(val * 100);
      })
      .catch(() => {});

      const fetchDevices = async () => {
        type Device = {
          id: string;
          is_active: boolean;
          name: string;
          type: string;
          volume_percent: number;
        }
        const responce = await fetch(
          "https://api.spotify.com/v1/me/player/devices",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }  
        );

        if(!responce.ok) {
          throw new Error('Failed to fetch devices');
        }

        const devices = await responce.json();
        const formattedDevices: Device[] = devices.items.map(
          (device: any) => ({
            id: device.id,
            is_active: device.is_active,
            name: device.name,
            type: device.type,
            volume_percent: device.volume_percent,
            
          })
        );
        setDevices(formattedDevices);
      };
  }, [player, token]);

  return (
    <CurrentlyPlayingStyled>
      <div className="songAlbumCover center">
        <img src={currentTrack?.album.images[0].url} alt=""></img>
      </div>
      <div className="songInformation">
        <div className="songName">{currentTrack?.name}</div>
        <div className="songAuthor">{currentTrack?.artists[0].name}</div>
      </div>
      <div className="playerControls center">
        <button
          className="backwardButton icon"
          style={{
            backgroundImage: `url("${backwardIcon}")`,
          }}
          onClick={() => {
            player.previousTrack();
          }}
        />
        <button
          className="playPauseButton icon"
          style={{
            backgroundImage: `url("${isPaused ? playIcon : pauseIcon}")`,
          }}
          onClick={() => {
            player.togglePlay();
          }}
        />

        <button
          className="forwardButton icon"
          style={{
            backgroundImage: `url("${forwardIcon}")`,
          }}
          onClick={() => {
            player.nextTrack();
          }}
        />
      </div>
      <div className="playerControlButtons">
        <button
          className="playerDevices icon"
          style={{backgroundImage: `url("${devicesIcon}")`}}
          onClick={toggleDevicesDropdown}
          >
            {dropdown && (
              <div className="devicesDropdown">
                {devices?.map((device) => (
                <div key={device.id} className="deviceItem">
                  {device.name}
                </div>
              ))}
              </div>
            )}
        </button>
        <div 
          className="playerQueue icon"
          style={{
            backgroundImage: `url("${queueIcon}")`,
          }}
        />
        <div className="playerVolume">
          <button
            className="playerVolumeButton icon center"
            style={{
              backgroundImage: `url("${
                volume
                  ? volumeIcons[Math.floor(volume / 0.34) + 1]
                  : volumeIcons[0]
              }")`,
            }}
            onClick={mutePlayer}
          ></button>
          <input
            className="playerVolumeInput"
            type="range"
            min={"0"}
            max={"100"}
            value={volume * 100}
            onChange={(e) => changeVolume(e.target.value)}
          />
        </div>
      </div>
    </CurrentlyPlayingStyled>
  );
};

export default CurrentlyPlaying;
