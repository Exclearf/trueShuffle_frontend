import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const useAuth = () => {
  /**
   * Function which checks whether the user has an unexpired cookie
   *
   * @returns {string | undefined} Undefined if no accessToken exists
   */
  const getSession = () => {
    console.log(Cookies.get("trueShuffleUserID"));
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
  const createSession = async (code: string) => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        code,
      });
      let expiresIn: any = (response.data.expiresIn - 60) * 1000;
      const authData = {
        accessToken: Cookies.set(
          response.data.accessToken,
          "trueShuffleUser/accessToken",
          {
            expires: expiresIn,
          }
        ),
        refreshToken: Cookies.set(
          response.data.refreshToken,
          "trueShuffleUser/refreshToken",
          {
            expires: expiresIn,
          }
        ),
        expiresIn: Cookies.set(
          response.data.expiresIn,
          "trueShuffleUser/expiresIn",
          {
            expires: expiresIn,
          }
        ),
      };
      return authData;
    } catch (e) {
      window.location.href = "/";
      console.error(
        `There has been a problem while deleting a session\nStack trace: ${e}}`
      );
      return false;
    }
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
        const timeout = setTimeout(async () => {
          const response = await axios.post("http://localhost:3000/refresh", {
            refreshToken: getSession().refreshToken,
          });
          Cookies.set(
            response.data.refreshToken,
            "trueShuffleUser/refreshToken",
            { expires: response.data.accessToken }
          );

          Cookies.set(response.data.expiresIn, "trueShuffleUser/expiresIn", {
            expires: response.data.expiresIn,
          });
          
          return true;
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

  const createCookie = () => {
    Cookies.set("trueShuffleUserID", "1", { expires: 1 });
  };
  const deleteCookie = () => {
    Cookies.remove("trueShuffleUserID");
  };

  return [
    getSession,
    createSession,
    endSession,
    extendSession,
    createCookie,
    deleteCookie,
  ] as const;
};
