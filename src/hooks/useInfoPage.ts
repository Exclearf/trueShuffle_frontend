import { log } from "../helpers/log";
import { useCookies } from "react-cookie";

export const useInfoPage = () => {
  const [cookies, setCookie] = useCookies();

  const isInfoPageOpen = () => {
    return !cookies.isInfoPageClosed;
  };

  const closeInfoPage = () => {
    setCookie("isInfoPageClosed", true);
    log("Info page closed");
  };

  return [isInfoPageOpen, closeInfoPage] as const;
};
