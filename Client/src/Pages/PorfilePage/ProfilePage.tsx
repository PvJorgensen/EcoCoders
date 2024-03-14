import { useState } from 'react';
import { Avatar, Upload } from 'antd';
import { Navigation } from '../../Components/navBar/Navigation';
import defaultimg from '../../assets/woman.jpg'
import './PeofilePage.css'

export interface ProfilePageProps {}

export const ProfilePage: React.FC<ProfilePageProps> = () => {

  const handleUpdateUser = () => {

  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div className="profile-background-img" style={{ backgroundColor: 'brown', width: '100%', height: '23vh' }}>
        <Upload className='user-upload' showUploadList={false} onChange={handleUpdateUser} >
          <Avatar size={90} icon={<img src={defaultimg}/>} className="user-avatar" />
        </Upload>
      </div>

      <Navigation />
    </div>
  );
};

export default ProfilePage;
