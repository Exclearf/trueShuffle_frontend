import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Index from "./Pages/Index";
import LogIn from "./Pages/LogIn";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const [
    getSession,
    createSession,
    endSession,
    extendSession,
    createCookie,
    deleteCookie,
  ] = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/"
          //@ts-ignore
          element={getSession() ? <Index logOut={deleteCookie}/> : <Navigate to="/login" />}
        />
        <Route
          path="login"
          element={
            getSession() ? <Navigate to="/" /> : <LogIn logIn={createCookie} />
          }
        />
      </Routes>
    </>
  );
};

export default App;
