import { Link, useLocation } from 'react-router-dom';
import styles from './nav.module.scss';
import { EnvironmentOutlined, UserOutlined, BulbOutlined, GlobalOutlined } from '@ant-design/icons';
import { TipsPage } from '../../Pages/Tipspage/TipsPage';

export const Navigation = () => {
  const location = useLocation();

  const getMenuActiveItem = () => {
    const { pathname } = location;

    if (pathname === '/') {
      return 'Home';
    } else if (pathname === '/map') {
      return 'Map';
    } else if (pathname === '/tips' || pathname.startsWith('/categorizedTips/') || pathname.startsWith('/detailTips/')) {
      return 'Tips'; // Same icon for tips, categorizedTips and detailtips
    } else if (pathname === '/profile') {
      return 'User';
    }

    return 'Home';
  };

  return (
    <nav className={styles.navbar}>
      <Link className={getMenuActiveItem() === 'Map' ? styles.active : ''} to="/map"><EnvironmentOutlined /></Link>
      <Link className={getMenuActiveItem() === 'Home' ? styles.active : ''} to="/"><GlobalOutlined /></Link>
      <Link
  className={getMenuActiveItem() === 'Tips' ? styles.active : ''}
  to="/tips"
  onClick={() => TipsPage.call}
>
  <BulbOutlined />
</Link>
      <Link className={getMenuActiveItem() === 'User' ? styles.active : ''} to="/profile"><UserOutlined /></Link>

    </nav>
  )
};
