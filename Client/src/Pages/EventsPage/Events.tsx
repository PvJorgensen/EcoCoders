//Components
import { Cards } from "../../Components/Cards/Cards"
import styles from "./Hpage.module.scss"



export const HomePage = () => {
  return (
    <>

      <section className={styles.topCard}>
        <h3>Beach Clean Up</h3>
        <p>April 21st</p>
        <p>10:00-13:00</p>
      </section>
      <Cards />
    </>
  )
}
