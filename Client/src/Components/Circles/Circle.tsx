import styles from './circle.module.scss'


export const Circle = () => {
  return (
    <div className={styles.circleWrapper}>
        <button className={`${styles.circle} ${styles.circleone}`}>
            EVENTS
        </button>

        <button className={`${styles.circle} ${styles.circletwo}`}>
            FRIENDS
        </button>

        <button className={`${styles.circle} ${styles.circlethree}`}>
            ABOUT
        </button>

        <button className={`${styles.circle} ${styles.circlefour}`}>
            TIPS
        </button>
    </div>
  )
}
