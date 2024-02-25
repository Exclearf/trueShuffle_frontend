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
              <TokenContext.Provider value={getSession().accessToken}>
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