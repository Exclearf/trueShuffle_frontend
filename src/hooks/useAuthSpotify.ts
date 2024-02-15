import { useState, useEffect } from "react";
import axios from "axios";

//set tokens
export default function useAuthSpotify(code: any) {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState("");

  useEffect(() => {

    axios.post("http://localhost:3000/login", {
      code,
    }).then(res => {
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      setExpiresIn(res.data.expiresIn);
    }).catch(err => {
      window.location.href = "/";
    })
  }, [code])

useEffect(() => {
  if(!refreshToken || !expiresIn) return;
  const timeout = setTimeout(() => {

  axios.post("http://localhost:3000/refresh", {
      refreshToken,
    }).then(res => {
      setAccessToken(res.data.accessToken);
      setExpiresIn(res.data.expiresIn);
    }).catch(() => {
      window.location.href = "/";
    })
  }, (expiresIn - 60) * 1000);
}, [refreshToken, expiresIn])

  return accessToken;
}