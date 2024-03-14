import React, { useState, useRef, useEffect } from "react";
import "./drawer.css";
import { EnvironmentFilled, FilterOutlined, PlusCircleFilled, UnorderedListOutlined } from "@ant-design/icons";
import { setGlobalVariableGreenPoints, setGlobalVariableMarks } from "../const/const";
import { useNavigate } from "react-router-dom";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isfilter: boolean;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, isfilter }) => {

  const navigate = useNavigate();
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

    if (!isOpen) setIsClosing(false);

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
  }, [isOpen, startY, offsetY, onClose, isOpen]);

  const drawerStyle = {
    transform: `translateY(${offsetY}px)`,
  };

  const filter = () => {
    const actionsItems = (value: string) => {
      console.log('Action item clicked:', value);

      switch (value) {
        case 'List':
          navigate('/events');
          break;
        case 'Events':
          setGlobalVariableMarks(false);
          setGlobalVariableGreenPoints(true);
          onClose();
          navigate('/map');
          break;
        case 'Green Points':
          setGlobalVariableGreenPoints(false);
          setGlobalVariableMarks(true);
          onClose();
          navigate('/map');
          break;
        case 'Challenges':
          navigate('/challenges');
          break;
        case 'Create':

          break;
        case 'Show all':
          setGlobalVariableGreenPoints(false);
          setGlobalVariableMarks(false);
          onClose();
          navigate('/map');
          break;
        default:
      }

    };

    if (isfilter) {
      return (
        <>
          <div className="drawer-filter-top">
            <div onClick={() => actionsItems('Show all')}>
              <FilterOutlined />
              <p>Show all</p>
            </div>
            <div onClick={() => actionsItems('Events')}>
              <EnvironmentFilled />
              <p>Events</p>
            </div>
            <div onClick={() => actionsItems('Green Points')}>
              <EnvironmentFilled />
              <p>Green Points</p>
            </div>
          </div>
          <div className="drawer-filter-bottom">
            <div onClick={() => actionsItems('Create')}>
              <PlusCircleFilled />
              <p>Create</p>
            </div>
            <div onClick={() => actionsItems('List')}>
              <UnorderedListOutlined />
              <p>List</p>
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <div className={`drawer ${isOpen && !isClosing ? "open" : ""}`} style={drawerStyle} ref={drawerRef}>
      <div className="drawer-content">
        <div className="swipe" />
        {filter()}
      </div>
    </div>
  );
};

export default Drawer;