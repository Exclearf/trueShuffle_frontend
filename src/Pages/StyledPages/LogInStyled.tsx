import styled from "styled-components";

const LogInWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
    flex-direction: column;
  .logIn-btn {
    background-color: none;
    transition: filter 250ms ease-in-out; /* Add this line */
    transition: transform 250ms ease-in-out; /* Add this line */


    filter: drop-shadow(0 0 0px #1e5128) drop-shadow(0 0 -1px #1e5128)
      drop-shadow(0 0 -1px #1e5128);
  }
  .logIn-btn:hover {
    filter: drop-shadow(0 0 2px #1e5128) drop-shadow(0 0 4px #1e5128)
      drop-shadow(0 0 2px #1e5128);
      transform: rotate(10deg);
  }
`;

export default LogInWrapper;
