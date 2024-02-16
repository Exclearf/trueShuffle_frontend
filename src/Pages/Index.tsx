import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Container from "./StyledPages/IndexStyled";

//@ts-ignore
const Index = ({ exitHandler }) => {
  return (
    <Container>
      <div className="spotify_body">
        <Sidebar/>
        <div className="body">
          <Navbar/>
          <div className="body_contents">
            <Body/>
            <nav>
              <ul>
              <button onClick={exitHandler}>Log out</button>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    <div className="spotify_footer">
      <Footer/>
    </div>
    </Container>
  );
};

export default Index;

// return (
//   <div>
//     <header>
//       <h1>Main Page</h1>
//     </header>
//     <main>
//       <p>Main page</p>
//       <nav>
//         <ul>
//           <button onClick={exitHandler}>Log out</button>
//         </ul>
//       </nav>
//     </main>
//   </div>
// );