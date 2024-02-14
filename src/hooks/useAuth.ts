import Cookies from "js-cookie";

export const useAuth = () => {
  /**
   * Function which checks whether the user has an unexpired cookie
   *
   * @returns {string | undefined} Undefined if the Cookie does not exist
   */
  const getSession = (): string | undefined => {
    console.log(Cookies.get("trueShuffleUserID"));
    return Cookies.get("trueShuffleUserID");
  };

  /**
   * Function which sends an authorization request to the server.
   * If the User ID is unknown, the respective error is thrown.
   *
   * @param isExtended Whether to create an extended session (keep userId cookie for longer)
   * @param userId Uniquely generated ID String for user
   *
   * @returns {boolean} True if user has been successfully signed in
   */
  const createSession = (isExtended: boolean, userId: string): boolean => {
    try {
    } catch (e: any) {
      console.error(
        `There has been a problem while creating a session\nStack trace: ${e}}`
      );
      throw e;
    }
    //Some logic
    let isSucceded = true;

    if (isSucceded) {
      Cookies.set(`trueShuffleUserID`, userId, { expires: 1 });
      return true;
    } else {
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
      // Make a call to the Back End to end a session
      let isSucceded = true;
      if (isSucceded) {
        Cookies.remove(`trueShuffleUserID`);
        return true;
      } else {
        return false;
      }
    } catch (e: any) {
      console.error(
        `There has been a problem while deleting a session\nStack trace: ${e}}`
      );
      throw e;
    }
  };

  /**
   * Function that asks the server to extend current session.
   * If successfull it prolonges the current Cookie life time to the specified TimeStamp.
   *
   * @returns {boolean} True if it prolonged the current session.
   */
  const extendSession = () => {
    if (getSession() !== undefined) {
      Cookies.set("trueShuffleUserID", getSession() as any, { expires: 1 });
      return true;
    } else {
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
