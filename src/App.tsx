import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Index from "./Pages/Index";
import LogIn from "./Pages/LogIn";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import { TokenContext } from "./Contexts/TokenContext";

const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
  const [getSession, createSession, isActiveSession] = useAuth();
  const isRemote = new RegExp("^https://encape.me.*").test(
    window.location.href
  );
  useEffect(() => {
    if (!code) return;
    createSession(code);
  }, [createSession]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            (isActiveSession() && isRemote) || !isRemote ? (
              <TokenContext.Provider value={getSession().accessToken || token}>
                <Index />
              </TokenContext.Provider>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="login"
          element={
            (isActiveSession() && isRemote) || !isRemote ? (
              <Navigate to="/" />
            ) : (
              <LogIn />
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;

const token =
  "BQCXaDSx6kenGQ2I555oNd7tsEKMYxQqL19REkl1QVokhiLQ9KJhj0qNwkCEX5rwl8g7EiHAv7B43_LhUJjDc08WCY0txcUcWLLGvHcQYuEfINiQXqcxsP64ucJjv0HvviYUwDnQfuRbTULYOeaRg3hM6TauqWaSIZHGDcWag4yYcsGMiqlqfs_zvvtj4_Lxkn-4sfrtZQ40Nq8-CeTlnKqgf6IDu5hyPGT5kjcBwX8O3a1HkldWlWVa-Wse7qMI955RyC_lAYTgCXpI2SA_r0j8hC1zm5Ud2o08FSaU6iYbwGvCNoRQ1l8Tpw";
