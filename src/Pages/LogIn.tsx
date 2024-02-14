import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

//@ts-ignore
const LogIn = ({ logIn }) => {
  return (
    <div>
      <header>
        <h1>Login</h1>
      </header>
      <main>
        <p>Login</p>
        <nav>
          <ul>
            <Link to="/">
              <button
                type="button"
                onClick={() => {
                  logIn();
                  window.location.reload();
                }}
              >
                Click Me!
              </button>
            </Link>
          </ul>
        </nav>
      </main>
      <Outlet />
    </div>
  );
};

export default LogIn;
