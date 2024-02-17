import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SettingsWheel from './StyledComponents/SettingsWheel'
import DivProps from './StyledComponents/SettingsWheel'

// Define the SettingsPageStyled styled component
//@ts-ignore
const SettingsPageStyled = styled.div<DivProps>`
  width: ${(props) => props.width || 'auto'}; // Default to 'auto' if no width is provided
  // Add more styling as needed
`;

// Define the SettingsPage component
function SettingsPage() {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.log(isHovered);
  }, [isHovered]);

  return (
    <SettingsPageStyled
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      width="100%" // Example value, adjust as needed
    >
      <SettingsWheel isHovered={isHovered}></SettingsWheel>
      <div className="settingsHole">123 {/* Additional content can be added here */}</div>
    </SettingsPageStyled>
  );
}

export default SettingsPage;