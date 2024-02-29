import styled from "styled-components";

const SettingsWheel = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transition: all 500ms;
  // Could be removed for cool effect :D
  transition-delay: 300ms;
  position: absolute;
  background-color: rgb(36, 36, 36);
  top: 0;
  bottom: 5px;
  left: 50px;
  margin: auto;
  overflow: hidden;
  color: transparent;
  user-select: none;
  border: 2px solid rgb(36, 36, 36);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  .settingsItem {
    z-index: 3;
    color: #ebe1e1;
    transform-origin: center center;
    white-space: nowrap;
    transition: all 200ms;
    transition-delay: 0ms;
    position: absolute;
    opacity: 0;
  }

  .settingsHole {
    background-color: #121212;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 0;
    left: 0;
    z-index: 2;
    margin: auto;
    border-radius: 50%;
    transition: all 500ms;
    transition-delay: 300ms;
  }

  &:hover {
    transition-delay: 0s;
    color: #ebe1e1;
    border-color: rgba(248, 237, 255, 0.5);
    background-color: rgb(36, 36, 36);
    width: 100vh;
    height: 100vh;
    left: calc(-100vh / 2 + 100px);

    .settingsItem{
      opacity: 1;
      transition-delay: 500ms;
    }


    .settingsHole {
      transition-delay: 0ms;
      width: 20vh;
      height: 20vh;
      right: 0px;
      left: 0px;
    }
  }
`;

export default SettingsWheel;
