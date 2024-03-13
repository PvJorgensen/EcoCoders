import { Link } from 'react-router-dom'
import styles from './nav.module.scss'
import { EnvironmentOutlined, UserOutlined, BulbOutlined, GlobalOutlined } from '@ant-design/icons';

export const Navigation = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/map"><EnvironmentOutlined /></Link>
      <Link to="/"><GlobalOutlined /></Link>
      <Link to="/tips"><BulbOutlined /></Link>
      <Link to="/PageNotFound"><UserOutlined /></Link>
    </nav>
  )
}
