import React from "react";
import useAuthSpotify from "../hooks/useAuthSpotify";

export default function Dashboard( code: any) {
  const accessToken = useAuthSpotify(code);
  return <div>{code}</div>;
}