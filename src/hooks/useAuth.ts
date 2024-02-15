import axios from "axios";
import Cookies from "js-cookie";

export const useAuth = () => {
  /**
   * Function which checks whether the user has an unexpired cookie
   *
   * @returns {string | undefined} Undefined if no accessToken exists
   */
  const getSession = () => {
    return {
      accessToken: Cookies.get("trueShuffleUser/accessToken"),
      refreshToken: Cookies.get("trueShuffleUser/refreshToken"),
      expiresIn: Cookies.get("trueShuffleUser/expiresIn"),
    };
  };

  /**
   * Function which sends an authorization request to the server.
   * If the User ID is unknown, the respective error is thrown.
   *
   * @param code Code obtained via
   *
   * @returns {boolean} True if user has been successfully signed in
   */
  const createSession = (code: string) => {
    const response = axios
      .post("https://backend-trueshuffle.encape.me/login", {
        code,
      })
      .then((response) => {
        console.log("createSession!2 INSIDE RESPONSE");
        Cookies.set("trueShuffleUser/accessToken", response.data.accessToken, {
          expires: response.data.expiresIn,
        });
        Cookies.set(
          "trueShuffleUser/refreshToken",
          response.data.refreshToken,
          {
            expires: response.data.expiresIn,
          }
        );
        Cookies.set("trueShuffleUser/expiresIn", response.data.expiresIn, {
          expires: response.data.expiresIn,
        });
        //@ts-ignore
        window.history.pushState({}, null, "/");
        window.location.reload();
      })
      .catch(() => {
        window.location = "/" as any;
      });
    console.log(response);
  };

  /**
   * Function that forces current session to end via request to delete the Access Token from the server.
   * It also deletes the Cookie associated with the deleted User ID;
   *
   * @returns {boolean} True if user has
   */
  const endSession = (): boolean => {
    try {
      Cookies.remove("trueShuffleUser/accessToken");
      Cookies.remove("trueShuffleUser/refreshToken");
      Cookies.remove("trueShuffleUser/expiresIn");
      return true;
    } catch (e) {
      console.error(
        `There has been a problem while deleting a session\nStack trace: ${e}}`
      );
      return false;
    }
  };

  /**
   * Function that asks the server to extend current session.
   * If successfull it prolonges the current Cookie life time to the specified TimeStamp.
   *
   * @returns {boolean} True if it prolonged the current session.
   */
  const extendSession = () => {
    try {
      if (!getSession().refreshToken || !getSession().expiresIn) {
        const timeout: any = setTimeout(async () => {
          const response = await axios.post(
            "https://backend-trueshuffle.encape.me/refresh",
            {
              refreshToken: getSession().refreshToken,
            }
          );
          Cookies.set(
            "trueShuffleUser/refreshToken",
            response.data.refreshToken,
            {
              expires: response.data.accessToken,
            }
          );

          Cookies.set("trueShuffleUser/expiresIn", response.data.expiresIn, {
            expires: response.data.expiresIn,
          });
          return timeout ? true : false;
        }, ((getSession().expiresIn as any) - 60) * 1000);
      } else {
        return false;
      }
    } catch (e) {
      window.location.href = "/";
      console.error(
        `There has been a problem while deleting a session\nStack trace: ${e}}`
      );
      return false;
    }
  };

  /**
   * Function that checks whether there is a saved session in the cookies.
   *
   * @returns {boolean} True if there is an accessToken saved
   */
  const isActiveSession = () => {
    console.log("IsActiveSession: " + getSession().accessToken);
    return getSession().accessToken !== undefined;
  };

  return [
    getSession,
    createSession,
    isActiveSession,
    endSession,
    extendSession,
  ] as const;
};
