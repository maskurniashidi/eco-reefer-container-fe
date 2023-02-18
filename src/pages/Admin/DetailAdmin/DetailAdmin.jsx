import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./DetailAdmin.module.css";
import DashboardLayout from "../../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";
import { Skeleton, Image } from "antd";
import { FaUserAlt } from "react-icons/fa";
import { DefaultAvatar } from "../../../assets/assets";

function DetailAdmin() {
  const [loading, setLoading] = useState(false);

  return (
    <DashboardLayout>
      <div className={styles.wrapper}>
        <div className={styles.topWrapper}>
          <h2 className={styles.pageTitle}>Detail Admin</h2>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
            <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
              Home
            </Link>
            <Link className={styles.breadActive} underline="hover" color="inherit" to="/admin">
              Admin
            </Link>
            <Typography className={styles.breadUnactive}>Detail Admin</Typography>
          </Breadcrumbs>
        </div>
      </div>
      {loading ? (
        <Skeleton />
      ) : (
        <div className={styles.detailContainer}>
          <div className={styles.container}>
            <div className={styles.leftContainer}>
              <div className={styles.profile}>
                <div className={styles.imageBoxProfile}>
                  <Image src={DefaultAvatar} className={styles.imageItemProfile} />
                </div>
                <div className={styles.topProfileText}>
                  <h5 className={styles.name}>Zahro Novianto</h5>
                  <p className={styles.type}>Admin</p>
                </div>
              </div>

              <div className={styles.mainDetail}>
                <div className={styles.mainUserDetail}>
                  <div className={styles.mainTitle}>
                    <FaUserAlt className={styles.mainTitleIcon} />
                    <h4 className={styles.mainTitleText}>Data Diri Admin</h4>
                  </div>
                  <div className={styles.mainDetailData}>
                    <div className={styles.mainLeftData}>
                      <p className={styles.titleDetail}>Id</p>
                      <p className={styles.titleDetail}>Nama</p>
                      <p className={styles.titleDetail}>Email</p>
                      <p className={styles.titleDetail}>No Whatsapp</p>
                    </div>
                    <div className={styles.mainRightData}>
                      <p className={styles.textDetail}>: 1</p>
                      <p className={styles.textDetail}>: Zahro Novianto</p>
                      <p className={styles.textDetail}>: zahro@gmail.com</p>
                      <p className={styles.textDetail}>: 087861138765</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default DetailAdmin;
