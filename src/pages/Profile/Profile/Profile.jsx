import React from "react";
import styles from "./Profile.module.css";
import DashboardLayout from "../../../layouts/dashboard-layout/DashboardLayout";
import { RiUserFill, RiLockPasswordFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import MyAccount from "../MyAccount/MyAccount";
import ResetPassword from "../ResetPassword/ResetPassword";
function Profile() {
  const location = useLocation();
  return (
    <DashboardLayout className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.menuProfile}>
            <Link to="/profile" className={styles.menuItem}>
              <RiUserFill className={styles.menuIcon} />
              <p className={styles.menuText}>Akun Saya</p>
            </Link>
            <Link to={{ pathname: "/profile", search: "?type=reset-password" }} className={styles.menuItem}>
              <RiLockPasswordFill className={styles.menuIcon} />
              <p className={styles.menuText}>Ubah Password</p>
            </Link>
          </div>
        </div>
        <div className={styles.right}>
          {location.search === "" && (
            <>
              <MyAccount />
            </>
          )}
          {location.search === "?type=reset-password" && (
            <>
              <ResetPassword />
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
