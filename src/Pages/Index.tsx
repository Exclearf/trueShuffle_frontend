//@ts-ignore
const Index = ({ exitHandler }) => {
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
    </div>
  );
};

export default Index;