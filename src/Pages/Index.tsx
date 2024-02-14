import { Outlet } from "react-router-dom";

//@ts-ignore
const Index = ({ logOut }) => {
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
                logOut();
                window.location.reload();
              }}
            >
              Log out
            </button>
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
