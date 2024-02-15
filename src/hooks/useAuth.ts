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
    console.log("The code is: " + code);
    console.log("createSession!1");
    const response = axios
      .post("https://backend-trueshuffle.encape.me/login", {
        code,
      })
      .then((response) => {
        console.log("createSession!2 INSIDE RESPONSE");
        Cookies.set(response.data.accessToken, "trueShuffleUser/accessToken", {
          expires: response.data.expiresIn,
        });
        Cookies.set(
          response.data.refreshToken,
          "trueShuffleUser/refreshToken",
          {
            expires: response.data.expiresIn,
          }
        );
        Cookies.set(response.data.expiresIn, "trueShuffleUser/expiresIn", {
          expires: response.data.expiresIn,
        });
        //@ts-ignore
        window.history.pushState({}, null, "/");
        console.log("---------END OF FUNC--------");
        console.log(`response.data.accessToken ${response.data.accessToken}`);
        console.log(`response.data.refreshToken ${response.data.refreshToken}`);
        console.log(`response.data.expiresIn ${response.data.expiresIn}`);
        console.log("----------------------------");
      })
      .catch(() => {
        window.location = "/" as any;
      });
    console.log(response);
    return false;
  };

  /**
   * Function that forces current session to end via request to delete the Access Token from the server.
   * It also deletes the Cookie associated with the deleted User ID;
   *
   * @returns {boolean} True if user has
   */
  const endSession = (): boolean => {
    try {
      //! Make a call to the Back End to end a session
      let isSucceded = true;
      if (isSucceded) {
        Cookies.remove("trueShuffleUser/accessToken");
        Cookies.remove("trueShuffleUser/refreshToken");
        Cookies.remove("trueShuffleUser/expiresIn");
        return true;
      } else {
        return false;
      }
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
            response.data.refreshToken,
            "trueShuffleUser/refreshToken",
            { expires: response.data.accessToken }
          );

          Cookies.set(response.data.expiresIn, "trueShuffleUser/expiresIn", {
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
