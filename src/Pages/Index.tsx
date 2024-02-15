import { Outlet } from "react-router-dom";

//@ts-ignore
const Index = ({ code, exitHandler }) => {
  return (
    <div>
      <header>
        <h1>Main Page</h1>
      </header>
      <main>
        <p>Main page</p>
        <nav>
          <ul>
            <button onClick={exitHandler}>Log out</button>
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
