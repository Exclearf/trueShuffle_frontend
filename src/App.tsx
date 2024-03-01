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
  "BQAA_yUq7HZGUz9JrKZRtfyJCIKsexv_qHYmEOSg9rmkBTe8HscIoB547SRZYX5On1zLl1OOCY27CofErxpsGRkYojH1VRpPF_Ib3vxmJJ4dBJBIyNJC9U9smpjKfi6ULLnTz1vHezXsddHIlGI9-URBBlbLYIZmx8o_WQPR1EppY-zJhC4yayT6FrhtUzfbh2tKstx4f859Pk2Z6zUtq28JyuGMgzq24wfNPgbvlUWHvvKGZwmx2ffkhY5vusGPEidyAByLYFxFVaBuZ5RAxGt6r3guvbHoM2wYvJWBP2oqGzWXp3afvDMPF-p66g";
