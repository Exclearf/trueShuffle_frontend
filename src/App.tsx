import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Index from "./Pages/Index";
import LogIn from "./Pages/LogIn";
import { useAuth } from "./hooks/useAuth";
import { useEffect, useState } from "react";

const App = () => {
  const [code, setCode] = useState(new URLSearchParams(window.location.search).get("code"))
  const [getSession, createSession, isActiveSession] = useAuth();
//@ts-ignore
   useEffect(() => {
    if (!code) return;
    createSession(code);
    console.log("SESSION: " + code);
    console.log(getSession());
  }, [code]);
  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            isActiveSession() ? (
              //@ts-ignore
              <Index code={getSession().accessToken} setCode={setCode} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="login"
          element={isActiveSession() ? <Navigate to="/" /> : <LogIn />}
        />
      </Routes>
    </main>
  );
};

export default App;
