import React, { useState, useRef, useEffect } from "react";
import "./drawer.css";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const [startY, setStartY] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      if (drawerRef.current) {
        setStartY(event.touches[0].clientY);
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (drawerRef.current) {
        const currentY = event.touches[0].clientY;
        const delta = currentY - startY;

        if (isOpen && delta > 0) {
          setOffsetY(delta);
        }
      }
    };

    const handleTouchEnd = () => {
      const closeThreshold = 50;

      if (offsetY > closeThreshold) {
        setOffsetY(0);
        setIsClosing(true);
        onClose();
      } else {
        setOffsetY(0);
      }
    };

    if (isOpen) {
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isOpen, startY, offsetY, onClose]);

  const drawerStyle = {
    transform: `translateY(${offsetY}px)`,
  };

  useEffect(() => {
    if(!isOpen) setIsClosing(false);
  }, [isOpen]);

  return (
    <div className={`drawer ${isOpen && !isClosing ? "open" : ""}`} style={drawerStyle} ref={drawerRef}>
      <div className="drawer-content">
        <div className="swipe" />
      </div>
    </div>
  );
};

export default Drawer;