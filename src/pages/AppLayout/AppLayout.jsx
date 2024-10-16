import Maps from "../../components/Map/Map";
import styles from "./AppLayout.module.css";
import SideBar from "../../components/SideBar/SideBar";
import User from "../../components/User/User";
function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <User />
      <Maps />
    </div>
  );
}

export default AppLayout;
