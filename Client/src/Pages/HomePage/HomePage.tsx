//Components
import { Cards } from "../../Components/Cards/Cards"
import styles from "./Hpage.module.scss"
import { Circle } from "../../Components/Circles/Circle"
import { Navigation } from "../../Components/navBar/Navigation"

import { supabase } from "../../services/clientSupabase";

const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log("Error signing out:", error.message);
}
export const HomePage = () => {
  return (
    <>
      <Circle />
      <section className={styles.topCard}>
        <h3>Welcome "Username"</h3>
        <p>I hope you are eager to start improving the planet and challenge your friends to do different challenges</p>
      </section>
      <button onClick={handleSignOut}>SignOut</button>
      <Cards />
      <Navigation />
    </>
  )
}
