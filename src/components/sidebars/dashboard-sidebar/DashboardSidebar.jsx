import React, { useState } from "react";
import { Skeleton } from "antd";
import { Link, useLocation } from "react-router-dom";
import styles from "./DashboardSidebar.module.css";
import {
  DashboardDark,
  DashboardColor,
  UserDark,
  UserColor,
  UserDark1,
  UserColor1,
} from "../../../assets/assets";

import TempIconWhite from "../../../assets/imgs/temp-icon-white.png"
import TempIconBlack from "../../../assets/imgs/temp-icon-black.png"

function DashboardSidebar() {
  let location = useLocation();
  const [loading, setLoading] = useState(false)
  const role = localStorage.getItem("role")

  return (
    <div className={styles.wrapper}>
      {
        loading ? <Skeleton /> : (
          <div className={styles.container}>
            {location.pathname.slice(0, 10) === "/dashboard" ? (
              <Link to="/dashboard" className={styles.linkSidebarActive}>
                <img src={DashboardColor} alt="icon sidebar" className={styles.iconSidebar} />
                <h5 className={styles.textColor}>Dashboard</h5>
              </Link>
            ) : (
              <Link to="/dashboard" className={styles.linkSidebar}>
                <img src={DashboardDark} alt="icon sidebar" className={styles.iconSidebar} />
                <h5 className={styles.text}>Dashboard</h5>
              </Link>
            )}
            {/* {location.pathname.slice(0, 19) === "/temperature-energy" ? (
              <Link to="/temperature-energy" className={styles.linkSidebarActive}>
                <img src={TempIconWhite} alt="icon sidebar" className={styles.iconSidebar} />
                <h5 className={styles.textColor}>Monitoring Energi</h5>
              </Link>
            ) : (
              <Link to="/temperature-energy" className={styles.linkSidebar}>
                <img src={TempIconBlack} alt="icon sidebar" className={styles.iconSidebar} />
                <h5 className={styles.text}>Monitoring Energi</h5>
              </Link>
            )} */}
            {
              role === "admin" &&
              <div>
                {location.pathname.slice(0, 6) === "/admin" ? (
                  <Link to="/admin" className={styles.linkSidebarActive}>
                    <img src={UserColor} alt="icon sidebar" className={styles.iconSidebar} />
                    <h5 className={styles.textColor}>Admin</h5>
                  </Link>
                ) : (
                  <Link to="/admin" className={styles.linkSidebar}>
                    <img src={UserDark} alt="icon sidebar" className={styles.iconSidebar} />
                    <h5 className={styles.text}>Admin</h5>
                  </Link>
                )}
              </div>
            }
            {/* {
              role === "admin" &&
              <div>
                {location.pathname.slice(0, 5) === "/user" ? (
                  <Link to="/user" className={styles.linkSidebarActive}>
                    <img src={UserColor1} alt="icon sidebar" className={styles.iconSidebar} />
                    <h5 className={styles.textColor}>User</h5>
                  </Link>
                ) : (
                  <Link to="/user" className={styles.linkSidebar}>
                    <img src={UserDark1} alt="icon sidebar" className={styles.iconSidebar} />
                    <h5 className={styles.text}>User</h5>
                  </Link>
                )}
              </div>
            } */}

          </div>
        )
      }
    </div>
  );
}

export default DashboardSidebar;
