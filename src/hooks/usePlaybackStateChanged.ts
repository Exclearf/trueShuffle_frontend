import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../Contexts/TokenContext";

let methodsTobeUpdated: any[] = [];

export const usePlaybackStateChanged = () => {
  const token = useContext(TokenContext);
  const [currentQueue, setCurrentQueue] = useState<any>();
  let timeout: any;
  /**
   * Function returns a response containing current queue.
   *
   * @returns {Object} A queue object
   */
  const requestCurrentQueue = () => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/queue",
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
      const data = await response.json();
      setCurrentQueue(data);
      return data;
    }, 1000);
  };

  const addMethod = (func: any, thisArg: any, ...args: any[]) => {
    methodsTobeUpdated.push(() => func.apply(thisArg, args));
  };

  const updateMethods = () => {
    methodsTobeUpdated.forEach((method: any) => {
      method();
    });
  };

  useEffect(() => {
    requestCurrentQueue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return [requestCurrentQueue, currentQueue, updateMethods, addMethod] as const;
};
