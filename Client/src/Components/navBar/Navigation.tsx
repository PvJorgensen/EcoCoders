import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './nav.module.scss';
import { EnvironmentOutlined, UserOutlined, BulbOutlined, GlobalOutlined } from '@ant-design/icons';

export const Navigation = () => {
  const location = useLocation();

  const getMenuActiveItem = () => {
    const { pathname } = location;

    if (pathname === '/') {
      return 'Home';
    } else if (pathname === '/map') {
      return 'Map';
    } else if (pathname === '/tips') {
      return 'Tips';
    } else if (pathname === '/user') {
      return 'User';
    }

    return 'Home';
  };

  return (
    <nav className={styles.navbar}>
      <Link className={getMenuActiveItem() === 'Map' ? styles.active : ''} to="/map"><EnvironmentOutlined /></Link>
      <Link className={getMenuActiveItem() === 'Home' ? styles.active : ''} to="/"><GlobalOutlined /></Link>
      <Link className={getMenuActiveItem() === 'Tips' ? styles.active : ''}  to="/tips"><BulbOutlined /></Link>
      <Link className={getMenuActiveItem() === 'User' ? styles.active : ''} to="/PageNotFound"><UserOutlined /></Link>
    </nav>
  );
};

