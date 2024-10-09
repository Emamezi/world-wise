import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Testimonials.module.css";
import PageNav from "../../components/PageNav/PageNav";
function Testimonials() {
  const navigate = useNavigate();
  return (
    <div className={styles.testimonials}>
      <PageNav />
      <h1>We love WorldWise</h1>
      <Button onClick={() => navigate("/")}>Go to home page</Button>
    </div>
  );
}

export default Testimonials;
