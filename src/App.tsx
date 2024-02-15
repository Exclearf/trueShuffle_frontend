import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Index from "./Pages/Index";
import LogIn from "./Pages/LogIn";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";

const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
  const [, createSession, isActiveSession, endSession] = useAuth();

  console.log("isActive: " + isActiveSession())
  console.log("Code: " + code);
  useEffect(() => {
    if (!code) return;
    createSession(code);
    // eslint-disable-next-line
  }, [code]);
  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            isActiveSession() ? (
              <Index exitHandler={endSession}/>
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
