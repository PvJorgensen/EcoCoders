//Components
import { Cards } from "../../Components/Cards/Cards"
import styles from "./Hpage.module.scss"
import { Circle } from "../../Components/Circles/Circle"

export const HomePage = () => {
  return (
    <>
      <Circle />
      <section className={styles.topCard}>
        <h3>Welcome "Username"</h3>
        <p>I hope you are eager to start improving the planet and challenge your friends to do different challenges</p>
      </section>
      <Cards />
    </>
  )
}
