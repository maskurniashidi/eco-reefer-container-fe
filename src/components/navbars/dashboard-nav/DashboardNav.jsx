import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { logout } from "../../../utils/auth";
import styles from "./DashboardNav.module.css";
import { NavDropdown } from "react-bootstrap";
import { message, Skeleton, Tooltip } from "antd";
import { FaUserCircle } from "../../../assets/assets";
import { RiUserFill, RiLockPasswordFill, RiNotification3Fill } from "react-icons/ri";
// new
import LOGO from "../../../assets/imgs/logo-login-zahro.png"

function DashboardNav() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const role = localStorage.getItem("role");
  console.log(role)

  const _onLogout = () => {
    logout();
    message.error("Logout berhasil");
    history.replace("/");
  };

  return (
    <div className={styles.wrapper}>
      {
        loading ? <Skeleton /> : (
          <div className={styles.container}>
            <div className={styles.left}>
              <img src={LOGO} alt="logo zahro" className={styles.logo} />
            </div>
            <div className={styles.right}>
              <Link className={styles.iconUserBox} to={{ pathname: "/profile", search: "?type=notifikasi" }}>
                <Tooltip placement="bottom" title={"Notifikasi"}>
                  <RiNotification3Fill className={styles.iconUser} />
                </Tooltip>
              </Link>
              <div className={styles.user}>
                <FaUserCircle className={styles.navbarAvatar} />
                {/* <img className={styles.navbarAvatar} src={`http://localhost:3000/${data.profileImage}`} /> */}
                <NavDropdown className={styles.dropdownContainer} title={<span className={styles.userName}>{role === "admin" ? "Admin" : "User"}</span>}>
                  {/* <NavDropdown.Item href="/profile">Lihat akun</NavDropdown.Item> */}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={_onLogout}>Keluar</NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default DashboardNav;
