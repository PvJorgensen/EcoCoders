import { useEffect, useState } from 'react';
import { Avatar, Upload, Modal } from 'antd';
import { Navigation } from '../../Components/navBar/Navigation';
import defaultimg from '../../assets/woman.jpg'
import { supabase } from "../../services/clientSupabase";
import './PeofilePage.css'
import '../Login/Landing.css'
import { Link } from 'react-router-dom';
import SettingOutlined from '@ant-design/icons/lib/icons/SettingOutlined';
import axiosInstance from '../../services/axios.service';

interface Event {
  id: number;
  name: string;
  description: string;
  longitude: number;
  latitude: number;
  date_start: number;
  date_end: number;
  imageURL: string;
}

interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  description: string;
  auth_id: any;
}

interface UserEvent {
  id_user: number;
  id_event: number;
}

function ProfilePage() {
  const [userData, setUserData] = useState<User>({
    id: 0,
    name: '',
    role: '',
    email: '',
    description: '',
    auth_id: null,
  });
  const [newUserData, setNewUserData] = useState({
    id: 0,
    name: '',
    description:''
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);
  const [userId, setUserId] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getUserId = async () => {
    const user = supabase.auth.getSession();
    const userId = ((await user).data.session?.user.id)
    return userId
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth_id = await getUserId();
        const { data, error } = await supabase.from('User').select('*').eq('auth_id', auth_id).single();
        if (error) throw error;
        setUserData(data);
        setUserId(data.id);
      } catch (error: any) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserEvents = async () => {
      const { data: userEvents, error } = await supabase.from('UserEvent').select('*').eq('id_user', userId);
      if (error) console.error('Error fetching UserEvent:', error);
      else {
        setUserEvents(userEvents);
        setNewUserData({
          id: userData.id,
          name: userData.name,
          description: userData.description,
        })
      }
    };
    if (userId) fetchUserEvents();
  }, [userId]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events: Event[] = [];
      for (const userEvent of userEvents) {
        const { data: eventArray, error } = await supabase.from('Event').select('*').eq('id', userEvent.id_event);
        if (error) console.error(`Error fetching Event for id ${userEvent.id_event}:`, error);
        else if (eventArray && eventArray.length > 0) events.push(eventArray[0]);
      }
      setEvents(events);
    };
    if (userEvents.length > 0) fetchEvents();
  }, [userEvents]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error signing out:", error.message);
  }

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.put(`/User?id=eq.${userData.id}`,{
        "id": userData.id,
        "name": newUserData.name,
        "description": newUserData.description
      });
        return response.data;
    } catch (error) {
      console.error('Error updating data: ', error, "name", newUserData.name,);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div className='profile-container'>
        <div className="profile-background-img" style={{ backgroundImage: `url('/fondo.jpg')`, width: '100%', height: '23vh', backgroundSize: '100% 100%', borderBottom: 'solid 3px #1E6091' }}>
          <Upload className='user-upload' showUploadList={false} >
            <Avatar size={90} icon={<img src={defaultimg} />} className="user-avatar" />
          </Upload>
        </div>
        <div className='profile-title'>
          <h2 className='profile-name'>{userData.name}</h2>
          <SettingOutlined style={{ position: 'absolute', right: '2.1em', top: '30vh' }} className="settings" onClick={showModal} />
        </div>
        <Modal className="blue-background-modal" visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
          <form className="settings-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder={userData.name}
              className="settings-input"
              onChange={(event) => setNewUserData({
                "id": newUserData.id,
                "name": event.target.value,
                "description": newUserData.description})
              }
            />
            <textarea
              name="description"
              placeholder={userData.description}
              className="settings-input"
              onChange={(event) => setNewUserData({
                "id": newUserData.id,
                "name": newUserData.name,
                "description": event.target.value})
              }
            />
            <button className="settings-button">UPDATE PROFILE</button>
          </form>
          <button onClick={handleSignOut} className="settings-button">Sign Out</button>
        </Modal>
        <div className='profile-description'>
          <p className='profile-description-text'>{userData.description}</p>
        </div>
        <div className='profile-events'>
          <h3>Events Joined:</h3>
          {events.map(event => (
            <Link to={`/event/${event.id}`} className="event-card" key={event.id}>
              <img src={event.imageURL} alt="event image" className='event-image' />
              <div className="event-mainText">
                <h4>{event.name}</h4>
                <p>{event.description.length > 25 ? event.description.substring(0, 25) + '...' : event.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Navigation />
    </div>
  );
}

export default ProfilePage
