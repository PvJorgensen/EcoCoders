import { Link } from 'react-router-dom'
import styles from './nav.module.scss'
import { EnvironmentOutlined, UserOutlined, BulbOutlined, GlobalOutlined } from '@ant-design/icons';

export const Navigation = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/PageNotFound"><EnvironmentOutlined /></Link>
      <Link to="/PageNotFound"><GlobalOutlined /></Link>
      <Link to="/PageNotFound"><BulbOutlined /></Link>
      <Link to="/PageNotFound"><UserOutlined /></Link>
    </nav>
  )
}
