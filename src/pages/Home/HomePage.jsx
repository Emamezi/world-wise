// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import PageNav from "../../components/PageNav/PageNav";

function HomePage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You trevael the world <br />
          Worldwise keeps track of your adventure
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to="app" className="cta">
          Start Tracking Now
        </Link>
      </section>
    </main>
  );
}

export default HomePage;
