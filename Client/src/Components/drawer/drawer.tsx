import React, { useState, useRef, useEffect, ReactNode } from "react";
import "./drawer.css";
import { EnvironmentFilled, FilterOutlined, PlusCircleFilled, UnorderedListOutlined, UploadOutlined } from "@ant-design/icons";
import { setGlobalVariableGreenPoints, setGlobalVariableMarks } from "../const/const";
import { useNavigate } from "react-router-dom";
import PopForm from "../Popform/Popform";
import { Button, DatePicker, Input, Upload } from "antd";
import GreenpointsSVG from '../../assets/GreenPoints.svg';
import ShowAllSVG from '../../assets/ShowAll.svg';
import Map from "../map/map";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isfilter: boolean;
  renderEvents?: () => ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, isfilter,  renderEvents }) => {

  const navigate = useNavigate();
  const [startY, setStartY] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const [isClosingModal, setIsClosingModal] = useState(false);
  const [eventName, setEventName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      if (drawerRef.current) {
        setStartY(event.touches[0].clientY);
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      if (drawerRef.current) {
        const currentY = event.touches[0].clientY;
        const delta = currentY - startY;

        if (isOpen && delta > 0) {
          setOffsetY(delta);
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
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
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
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

  const openModal = () => {
    setIsClosingModal(true);
  }

  const closeModal = () => {
    setIsClosingModal(false);
  }

  const [activeitem,setActiveItem] = useState<string>('Show all');

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
          setActiveItem('Events');
          break;
        case 'Green Points':
          setGlobalVariableGreenPoints(false);
          setGlobalVariableMarks(true);
          onClose();
          navigate('/map');
          setActiveItem('Green Points')
          break;
        case 'Challenges':
          navigate('/challenges');
          break;
        case 'Create':
          onClose();
          openModal();
          break;
        case 'Show all':
          setGlobalVariableGreenPoints(false);
          setGlobalVariableMarks(false);
          onClose();
          navigate('/map');
          setActiveItem('Show all')
          break;
        default:
      }

    };

    if (isfilter) {
      return (
        <>
          <div className="drawer-filter-top">
            <div  className={activeitem === 'Show all' ? 'active' : ''} onClick={() => actionsItems('Show all')}>
              <img src={ShowAllSVG} alt="Show All SVG" />
              <p>Show all</p>
            </div>
            <div  className={activeitem === 'Events' ? 'active' : ''} onClick={() => actionsItems('Events')}>
              <EnvironmentFilled />
              <p>Events</p>
            </div>
            <div  className={activeitem === 'Green Points' ? 'active' : ''} onClick={() => actionsItems('Green Points')}>
              <img src={GreenpointsSVG} alt="Greenpoints SVG" />
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

  const renderInputs = () => {
    return (
      <>
        <Upload
          style={{ marginTop: '1rem', display: 'block' }}
          beforeUpload={() => false}
          listType="picture"
          multiple={false}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
        <Input style={{ marginTop: '1rem' }} placeholder="Event Name" value={eventName} onChange={e => setEventName(e.target.value)} />
        <Input.TextArea style={{ marginTop: '1rem' }} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <DatePicker style={{ marginTop: '2rem' }} placeholder="Start Date" value={startDate} onChange={date => setStartDate(date)} />
        <DatePicker placeholder="End Date" value={endDate} onChange={date => setEndDate(date)} />
        <div style={{ width: '100%', height: '10rem', marginTop: '1rem' }}>
          <Map marks={null} greenpoints={null} selectable={true} />
        </div>
      </>
    );
  };

  return (
    <div className={`drawer ${isOpen && !isClosing ? "open" : ""}`} style={drawerStyle} ref={drawerRef}>
      <div className="drawer-content">
        <div className="swipe" />
        {filter()}
        {renderEvents && renderEvents()}
        <PopForm renderInputs={renderInputs} cancel={closeModal} showModalAutomatically={isClosingModal} ></PopForm>
      </div>
    </div>
  );
};

export default Drawer;