import React, { useContext, useEffect, useState } from "react";
import CurrentlyPlayingStyled from "./StyledComponents/CurrentlyPlayingStyle";
import { usePlaybackStateChanged } from "../../hooks/usePlaybackStateChanged";

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

//* Icons for devices pop up
import smartphoneIcon from "../../Resources/other/smartphone.svg";
import laptopIcon from "../../Resources/other/laptop.svg";

//* Icons for playback controls of the Spotify player
import playIcon from "../../Resources/controls/play.svg";
import pauseIcon from "../../Resources/controls/pause.svg";
import backwardIcon from "../../Resources/controls/backward.svg";
import forwardIcon from "../../Resources/controls/forward.svg";
import { log } from "../../helpers/log";

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
  isQueuePopUpHoverable: boolean;
  currentlyPlayingPlaylist: string;
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
  isQueuePopUpHoverable,
  currentlyPlayingPlaylist,
}) => {
  const token = useContext(TokenContext);
  const [volume, setVolume] = useState<number>(0.5);
  const [devices, setDevices] = useState<device[]>([]);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [isQueuePopUpOpen, setIsQueuePopUpOpen] = useState<boolean>(true);
  const [requestCurrentQueue, currentQueue, , addMethod] =
    usePlaybackStateChanged();

  // hande device menu dropdown
  const toggleDevicesDropdown = () => {
    setDropdown(!dropdown);
  };

  const changeVolume = (val: any) => {
    if (player) {
      log("Set player volume to " + val);
      player.setVolume(val / 100);
      setVolume(val / 100);
    }
  };

  const mutePlayer = () => {
    log("Mute player");
    if (volume === 0) {
      player?.setVolume(prevValue);
      setVolume(prevValue);
    } else {
      prevValue = volume;
      player?.setVolume(0);
      setVolume(0);
    }
  };

  const fetchDevices = async () => {
    log("Fetching devices");
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/devices",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      log("Failed to fetch devices");
      return;
    }

    const data = await response.json();
    const formattedDevices: device[] = data.devices?.map((device: any) => ({
      id: device?.id,
      is_active: device.is_active,
      name: device?.name,
      type: device?.type,
      volume_percent: device.volume_percent,
    }));
    setDevices(formattedDevices);

    log("Successfully fetched devices");
  };

  const handleChangeDevices = async (deviceId: string) => {
    log(`Changing the device to ${deviceId}`);
    const response = await fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        device_ids: [deviceId],
      }),
    });
    if (!response.ok) {
      log(`Failed to change the current device to ${deviceId}`);
      return;
    }
  };

  const playTrack = async (uri: any) => {
    log("Playing track from queue " + uri);
    let playlistId = currentlyPlayingPlaylist.split("/").slice(-1);
    if (playlistId[0] === "tracks") {
      await fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uris: [uri],
        }),
      });
    } else {
      await fetch(`https://api.spotify.com/v1/me/player/next`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  };

  useEffect(() => {
    setIsQueuePopUpOpen(isQueuePopUpHoverable);
  }, [isQueuePopUpHoverable]);

  useEffect(() => {
    addMethod(requestCurrentQueue, null, null);
    addMethod(fetchDevices, null, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    player?.addListener("ready", async () => {
      player
        ?.getVolume()
        .then((val: number) => {
          setVolume(val * 100);
        })
        .catch(() => {});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player, token]);

  return (
    <CurrentlyPlayingStyled>
      <div className="songAlbumCover center">
        {currentTrack?.album.images[0].url && (
          <img src={currentTrack?.album.images[0].url} alt="" />
        )}
      </div>
      <div className="songInformation">
        <div className="songName">{currentTrack?.name}</div>
        <div className="songAuthor">{currentTrack?.artists[0]?.name}</div>
      </div>
      <div className="playerControls center">
        <button
          className="backwardButton icon iconClickable"
          style={{
            backgroundImage: `url("${backwardIcon}")`,
          }}
          onClick={() => {
            player.previousTrack();
          }}
        />
        <button
          className="playPauseButton icon iconClickable"
          style={{
            backgroundImage: `url("${isPaused ? playIcon : pauseIcon}")`,
          }}
          onClick={() => {
            player.togglePlay();
          }}
        />

        <button
          className="forwardButton icon iconClickable"
          style={{
            backgroundImage: `url("${forwardIcon}")`,
          }}
          onClick={() => {
            player.nextTrack();
          }}
        />
      </div>
      <div className="playerControlButtons">
        <div className="playerDevices">
          <div
            className="playerDevicesbtn icon iconClickable"
            onClick={toggleDevicesDropdown}
            style={{ backgroundImage: `url("${devicesIcon}")` }}
          />
          {dropdown && (
            <div className="Dropdown playerDevicesbtn ">
              <p>Devices</p>
              <ul>
                {devices?.map((device) => (
                  <li
                    key={device.id}
                    onClick={() => handleChangeDevices(device.id)}
                    className="Device DeviceButton"
                  >
                    <div className="DeviceBtnLayout">
                      <div
                        className="icon background DeviceIcon"
                        style={{
                          backgroundImage: `url("${
                            device?.type === "Computer"
                              ? laptopIcon
                              : smartphoneIcon
                          }")`,
                        }}
                      />
                      <div className="DeviceInfo">
                        <div className="DeviceName">Name: {device?.name}</div>
                        <div className="DeviceStatus">
                          Active: {device?.is_active ? "Yes" : "No"}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div
          className={
            "playerQueue " +
            (isQueuePopUpHoverable ? "playerQueuePopUpHoverable" : "")
          }
        >
          <div
            className="background icon iconClickable"
            style={{
              backgroundImage: `url("${queueIcon}")`,
            }}
            onClick={() => setIsQueuePopUpOpen((current: any) => !current)}
          />
          <div
            className={
              "playerQueuePopUp " +
              (isQueuePopUpHoverable
                ? ""
                : isQueuePopUpOpen && "playerQueuePopUpHover")
            }
          >
            <div className="popUpContent">
              <div className="current">
                <div className="currentName">
                  {currentQueue?.currently_playing?.name}
                </div>
              </div>
              <div className="queue">
                {currentQueue?.queue?.map((queueItem: any, index: any) => (
                  <div className="queueItem" key={index}>
                    {
                      <div
                        className="queueItemName"
                        onClick={() => {
                          playTrack(queueItem?.uri);
                        }}
                      >
                        {queueItem?.name}
                      </div>
                    }
                  </div>
                ))}
              </div>
              <div className="placeholder"></div>
            </div>
          </div>
        </div>
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
