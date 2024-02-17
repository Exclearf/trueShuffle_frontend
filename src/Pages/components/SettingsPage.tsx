import React, { useState, useRef, useEffect } from "react";
import SettingsWheel from "./StyledComponents/SettingsWheel";
import SettingsPageStyled from "./StyledComponents/SettingsPageStyled";

interface SettingsPageProps {
  texts?: string[]; // Assuming texts is an optional prop
}

const SettingsPage: React.FC<SettingsPageProps> = ({ texts }) => {
  const [rotation, setRotation] = useState<number>(0);
  const rotatingRef = useRef<boolean>(false);
  const lastY = useRef<number>(0);
  const circleRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const numberOfTexts = texts?.length || 1; // Default to 5 if texts is not provided
  const anglePerText = 360 / numberOfTexts;

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    setRotation((prevRotation) => prevRotation + e.deltaY * 0.2);

    if (scrollTimeoutRef.current !== null) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setRotation((currentRotation) => adjustRotation(currentRotation));
    }, 750);
  };

  const adjustRotation = (currentRotation: number) => {
    const adjustmentAngle = currentRotation % anglePerText;
    if (adjustmentAngle < anglePerText / 2) {
      return currentRotation - adjustmentAngle;
    } else {
      return currentRotation + (anglePerText - adjustmentAngle);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    rotatingRef.current = true;
    lastY.current = e.clientY;
    e.preventDefault();
  };

  const handleMouseUp = () => {
    rotatingRef.current = false;
    setRotation((currentRotation) => adjustRotation(currentRotation));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rotatingRef.current) {
      const deltaY = e.clientY - lastY.current;
      setRotation((prevRotation) => prevRotation - deltaY * 0.5);
      lastY.current = e.clientY;
      e.preventDefault();
    }
  };

  const handleMouseLeave = () => {
    rotatingRef.current = false;
    setRotation((currentRotation) => adjustRotation(currentRotation));
  };

  useEffect(() => {
    if (circleRef.current) {
      const texts = circleRef.current.querySelectorAll(".settingsItem");
      const circleRadius = window.innerHeight / 2;

      texts.forEach((elem, index) => {
        const rotation = index * anglePerText + anglePerText / 2;
        const angle = rotation * (Math.PI / 180);
        console.log(
          circleRadius - elem.getBoundingClientRect().width < 0
            ? circleRadius - elem.getBoundingClientRect().width
            : 20
        );
        const textRadius = circleRadius - 20;
        const x = textRadius * Math.cos(angle);
        const y = textRadius * Math.sin(angle);

        (elem as HTMLElement).style.left = `${circleRadius + x}px`;
        (elem as HTMLElement).style.top = `${circleRadius + y}px`;
        (elem as HTMLElement).style.transform = `translate(-50%, -50%) rotate(${
          180 + rotation
        }deg)`;
      });
    }
  }, []);

  const renderTextElements = () => {
    return texts?.map((text, index) => (
      <div key={index} className="settingsItem">
        {text}
      </div>
    ));
  };

  return (
    <SettingsPageStyled>
      <div className="settingsWheelContainer">
        <SettingsWheel
          ref={circleRef}
          className="settingsWheel"
          onWheel={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {renderTextElements()}
        </SettingsWheel>
        <div className="settingsHole"></div>
      </div>
    </SettingsPageStyled>
  );
};

export default SettingsPage;
