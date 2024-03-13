import { useNavigate } from 'react-router-dom';
import styles from './circle.module.scss';

export const CircleLanding = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login')
  }

  const goToSignup = () => {
    navigate('/signup')
  }
  return (
    <div className={styles.circleWrapper}>
      <button className={`${styles.circle} ${styles.circlefive}`}>
        THERE IS ONLY PLANET A
      </button>

      <button onClick={goToSignup} className={`${styles.circle} ${styles.circleseven}`}>
        SIGN UP
      </button>

      <button onClick={goToLogin} className={`${styles.circle} ${styles.circlesix}`}>
        LOGIN
      </button>
    </div>
  )
}
