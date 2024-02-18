import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Index from "./Pages/Index";
import LogIn from "./Pages/LogIn";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";

const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
  const token1 =
    "BQAX_5bQ64z9CbWdZe4Dku7Kx25Y0ifDwbDjUMCdaQPsrs780Y4flNgMJCkb0aWXZLYZaOC-oAsAetk-PtunOy8So0Ouu4kCp7v7DNaS0cVio3H8M37Vi7KHlnWt7MVSS_AkeLAFGQ3gynHeFjU-XxPcDc5nP-F-SUCXSO__C5MOE7e2-x0r-rl2rJiSQ86dEMX_ELWPQ_Sur1_5ea5fyoZDM9XMxCmPHpykGd7kfRwCWcNRngUZIyjuOVMTH_WdYzxAhyTC2IhCmDZm4DWDsK_rG1W2VP12O-TlwOQoiHJqz0EXadY";
  const [getSession, createSession, isActiveSession] = useAuth();
  const isRemote = new RegExp("^https://encape.me.*").test(
    window.location.href
  );
  useEffect(() => {
    if (!code) return;
    createSession(code);
    // eslint-disable-next-line
  }, [code]);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            (isActiveSession() && isRemote) || !isRemote ? (
              <Index token={token1} />
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
