import { Outlet } from "react-router-dom";

//@ts-ignore
const Index = ({ code, setCode }) => {
  let codeParam = new URLSearchParams(window.location.search).get("code");
  if (!codeParam) setCode(codeParam);
  return (
    <div>
      <header>
        <h1>Main Page</h1>
      </header>
      <main>
        <p>Main page</p>
        <nav>
          <ul>
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              Log out
            </button>
            {code}
            {/* <Link to="/login">Log In or Auth</Link>*/}
          </ul>
        </nav>
      </main>
      <Outlet />
    </div>
  );
};

export default Index;

// if(isAuthenticated() === true){
//     display page name
// }
// else{
//     rerroute
// }
