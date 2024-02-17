import styled from "styled-components";

interface DivProps {
  width: number; // Add other prop types here if needed
}

const SettingsPageStyled = styled.div<DivProps>`
  grid-area: settingsWheel;
`;

export default SettingsPageStyled;
