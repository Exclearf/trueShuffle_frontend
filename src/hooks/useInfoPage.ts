import { useCookies } from "react-cookie";

export const useInfoPage = () => {
  const [cookies, setCookie] = useCookies();

  const isInfoPageOpen = () => {
    return !cookies.isInfoPageClosed;
  };

  const closeInfoPage = () => {
    setCookie("isInfoPageClosed", true);
  };

  return [isInfoPageOpen, closeInfoPage] as const;
};
