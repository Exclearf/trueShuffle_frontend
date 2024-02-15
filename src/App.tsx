import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Index from "./Pages/Index";
import LogIn from "./Pages/LogIn";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";

const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
  const [getSession, CreateSession, createCookie, deleteCookie] = useAuth();

  useEffect(() => {
    if (!code) return;
    CreateSession(code);
  }, [code]);

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            getSession() ? (
              <Index code={getSession().accessToken} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="login"
          element={
            getSession() ? <Navigate to="/" /> : <LogIn logIn={createCookie} />
          }
        />
      </Routes>
    </main>
  );
};

export default App;
