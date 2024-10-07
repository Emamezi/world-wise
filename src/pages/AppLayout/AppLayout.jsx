import Maps from "../../components/Map/Map";
import styles from "./AppLayout.module.css";
import SideBar from "../../components/SideBar/SideBar";
function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Maps />
    </div>
  );
}

export default AppLayout;
