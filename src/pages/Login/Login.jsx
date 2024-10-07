import { useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../../components/PageNav/PageNav";

function Login() {
  const [email, setEmail] = useState("mezi@gmail.com");
  const [password, setPassword] = useState("mezi@gmail.com");
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className={styles.row}>
          <label htmlFor="email">Password</label>
          <input
            type="password"
            id="passowrd"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <button>Log in</button>
        </div>
      </form>
    </main>
  );
}

export default Login;
