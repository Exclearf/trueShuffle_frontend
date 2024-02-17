import styled from "styled-components";

const SettingsWheel = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transition: all 1s;
  position: absolute;
  background-color: rgb(36, 36, 36);
  top: 0;
  bottom: 5px;
  left: 50px;
  margin: auto;
  overflow: hidden;
  color: transparent;
  user-select: none;
  border: 2px solid white; /* Optional */
  display: flex;
  justify-content: center;
  align-items: center;
  transition-delay: 500ms;
  &:hover {
    transition-delay: 0s;
    color: #ebe1e1;
    background-color: rgb(36, 36, 36);
    width: 100vh;
    height: 100vh;
    left: calc(-100vh / 2 + 60px);
  }
  .settingsItem {
    position: absolute;
    transform-origin: center center;
    white-space: nowrap;
  }
`;

export default SettingsWheel;
