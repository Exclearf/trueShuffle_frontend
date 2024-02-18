import React, { useState, useRef, useEffect } from "react";
import SettingsWheel from "./StyledComponents/SettingsWheel";
import SettingsPageStyled from "./StyledComponents/SettingsPageStyled";

interface SettingsPageProps {
  settingItems?: {
    name: string;
    handler: (value: boolean) => void;
}[]
}


const SettingsPage: React.FC<SettingsPageProps> = ({ settingItems }) => {
  const [rotation, setRotation] = useState<number>(0);
  const [isWheelOpen, setIsWheelOpen] = useState<boolean>(true);
  const rotatingRef = useRef<boolean>(false);
  const lastY = useRef<number>(0);
  const circleRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const numberOfTexts = settingItems?.length || 1;
  const anglePerText = 360 / numberOfTexts;

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
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
    }
  };

  const handleMouseLeave = () => {
    rotatingRef.current = false;
    setRotation((currentRotation) => adjustRotation(currentRotation));
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    rotatingRef.current = true;
    setIsWheelOpen(true);
    lastY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!rotatingRef.current) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - lastY.current;
    setRotation((prevRotation) => prevRotation - deltaY * 0.5);
    lastY.current = currentY;
  };

  const handleTouchEnd = () => {
    rotatingRef.current = false;
    setIsWheelOpen(false);
    setRotation((currentRotation) => adjustRotation(currentRotation));
  };

  useEffect(() => {
    if (circleRef.current && anglePerText) {
      const settingItems = circleRef.current.querySelectorAll(".settingsItem");
      const circleRadius = window.innerHeight / 2;

      settingItems.forEach((elem, index) => {
        const rotation = index * anglePerText;
        const angle = rotation * (Math.PI / 180);
        const textRadius = circleRadius - (elem.clientWidth/2 + 10);
        const x = textRadius * Math.cos(angle);
        const y = textRadius * Math.sin(angle);
        (elem as HTMLElement).style.left = `${circleRadius + x}px`;
        (elem as HTMLElement).style.top = `${circleRadius + y}px`;
        (elem as HTMLElement).style.transform = `translate(-50%, -50%) rotate(${
          180 + rotation
        }deg)`;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isWheelOpen) {
      document.addEventListener("touchmove", handleTouchMove as any, {
        passive: false,
      });
    } else {
      document.removeEventListener("touchmove", handleTouchMove as any);
    }

    return () => {
      document.removeEventListener("touchmove", handleTouchMove as any);
    };
  }, [isWheelOpen]);

  const renderTextElements = () => {
    return settingItems?.map((item, index) => (
      <div key={index} className="settingsItem">
        {item.name}
        <input type="checkbox" onChange={(e) => item.handler(e.target.checked) as unknown as React.ChangeEventHandler<HTMLInputElement>} defaultChecked={true}/>
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
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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
