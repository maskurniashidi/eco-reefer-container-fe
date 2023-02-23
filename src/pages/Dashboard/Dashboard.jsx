import React, { useState } from "react";
import { Skeleton, Switch, Input, Carousel } from "antd";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";
import TEMPLOGO from "../../assets/imgs/temp-zahro.png"
import ERCICON from "../../assets/imgs/erc-zahro.png"
import ApexChart from "../../components/charts/ApexChart";
import HEADING from "../../assets/imgs/dashboard-heading.png"

function Dashboard() {
  const [dataTemp, setDataTemp] = useState([
    {
      title: "Temperature Sensor 1",
    },
    {
      title: "Temperature Sensor 2",
    },
    {
      title: "Temperature Sensor 3",
    }
  ])
  const [loading, setLoading] = useState(false);
  const [dataY, setDataY] = useState([0, -23, -12, 2, 8, 3, 2, -4, 6, 8, -30, 2, 4, -6, 1, 10, 0, 2, 10, 2, 10, 3, 2, 2])
  const [dataX, setDataX] = useState(["00.00", "01.00", "02.00", "03.00", "05.00", "06.00", "07.00", "08.00", "09.00", "10.00", "11.00", "12.00", "13.00", "14.00", "15.00", "16.00", "17.00", "18.00", "19.00", "20.00", "21.00", "22.00", "23.00", "24.00"])

  return (
    <DashboardLayout>
      {loading ? (
        <Skeleton />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.topWrapper}>
            <h2 className={styles.pageTitle}>Dashboard</h2>
            <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
              <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
                Home
              </Link>
              <Typography className={styles.breadUnactive}>Dashbord</Typography>
            </Breadcrumbs>
          </div>
          <div className={styles.main}>
            {/* -------------------HEADING--------------- */}
            <div className={styles.heading}>
              <img src={HEADING} alt="" className={styles.headingImg} />
            </div>
            {/* ------------------RESUME--------------- */}
            <div className={styles.resume}>
              {dataTemp.map((item, index) => (
                <div key={index} >
                  <div className={styles.resumeCard}>
                    <img src={TEMPLOGO} alt="temp icon" className={styles.iconresume} />
                    <div className={styles.resumeDesc}>
                      <p className={styles.resumeTitle}>{item.title}</p>
                      <p className={styles.resumeValue}>90 <sup>o</sup>C</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.resumeCard}>
                <img src={ERCICON} alt="temp icon" className={styles.iconresume} />
                <div className={styles.resumeDesc}>
                  <p className={styles.resumeTitle}>Temperature ERC</p>
                  <p className={styles.resumeValue}>-90 <sup>o</sup>C</p>
                </div>
              </div>
            </div>
            {/* -------------------MAINCONTENT--------------- */}
            <div className={styles.mainContent}>
              <div className={styles.leftMain}>
                <div className={styles.leftMid}>
                  <ApexChart title="Statistik Temperature ERC" data={dataY} categories={dataX} />
                </div>
                <div className={styles.leftBottom}>
                  <h3 className={styles.titleLeftBottom}>Control Temperature</h3>
                  <div className={styles.controlLeftBottom}>
                    <p className={styles.descLeftBottom}>Compressor Status</p>
                    <Switch className={styles.toogle} checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="whatsapp" className={styles.label}>
                      Set
                    </label>
                  </div>
                  <div className={styles.setBoxs}>
                    <Input required type="number" className={styles.input} name="setpoint" />
                    <p className={styles.setCelcius}><sup>o</sup>C</p>
                    <button className={styles.btnSet}>Set</button>
                    <button className={styles.btnSet}>Reset</button>
                  </div>
                </div>
              </div>
              {/* <div className={styles.rightMain}>
                <h3 className={styles.titleLeftBottom}>Penggunaan Daya</h3>
                <div className={styles.dayaCards}>
                  <div className={styles.rightTop}>
                    <h2 className={styles.titleRightTop}>Tegangan</h2>
                    <div className={styles.valueRightTop}>207.5 V</div>
                  </div>
                  <div className={styles.rightMid}>
                    <h2 className={styles.titleRightTop}>Arus</h2>
                    <div className={styles.valueRightTop}>1.97 W</div>
                  </div>
                  <div className={styles.rightBottom}>
                    <h2 className={styles.titleRightTop}>Total Daya Listrik</h2>
                    <div className={styles.valueRightTop}>47 KWH</div>
                    <div className={styles.value2RightTop}>Rp. 79.000</div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;
