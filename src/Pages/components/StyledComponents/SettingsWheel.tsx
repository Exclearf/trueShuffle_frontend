import styled from "styled-components";

interface DivProps {
  isHovered: boolean; // Add other prop types here if needed
}

const SettingsWheel = styled.div<DivProps>`
  width: 1000px;
  height: 1000px;
  background: red;
`;

export default SettingsWheel;
