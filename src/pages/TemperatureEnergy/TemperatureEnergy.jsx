import React, { useState } from "react";
import { Skeleton, Switch, Input } from "antd";
import { Link } from "react-router-dom";
import styles from "./TemperatureEnergy.module.css";
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";
import TEMPLOGO from "../../assets/imgs/temp-zahro.png"
import ERCICON from "../../assets/imgs/erc-zahro.png"
import ApexChart from "../../components/charts/ApexChart";
import HEADING from "../../assets/imgs/dashboard-heading.png"

function TemperatureEnergy() {
    const [dataTemp, setDataTemp] = useState([
        {
            title: "Tegangan",
            value: "207.5 V"
        },
        {
            title: "Arus",
            value: "1.97 W"
        },
        {
            title: "Total Daya Listrik",
            value: "47 KWH"
        }
    ])
    const [loading, setLoading] = useState(false);

    const [dataY, setDataY] = useState([0, 23, 12, 20, 28, 230, 120, 140, 260, 180, 310, 120, 240, 60, 180, 300, 220, 320, 310, 280, 400, 300, 220, 320])
    const [dataX, setDataX] = useState(["00.00", "01.00", "02.00", "03.00", "05.00", "06.00", "07.00", "08.00", "09.00", "10.00", "11.00", "12.00", "13.00", "14.00", "15.00", "16.00", "17.00", "18.00", "19.00", "20.00", "21.00", "22.00", "23.00", "24.00"])
    return (
        <DashboardLayout>
            {loading ? (
                <Skeleton />
            ) : (
                <div className={styles.wrapper}>
                    <div className={styles.topWrapper}>
                        <h2 className={styles.pageTitle}>Temperature Energy</h2>
                        <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
                            <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
                                Home
                            </Link>
                            <Typography className={styles.breadUnactive}>Temperature Energy</Typography>
                        </Breadcrumbs>
                    </div>
                    <div className={styles.main}>
                        {/* -------------------HEADING--------------- */}

                        {/* ------------------RESUME--------------- */}

                        {/* -------------------MAINCONTENT--------------- */}
                        <div className={styles.mainContent}>
                            <div className={styles.leftMain}>
                                <div className={styles.leftMid}>
                                    <ApexChart title="Tegangan" data={dataY} categories={dataX} />
                                </div>
                                <div className={styles.leftMid}>
                                    <ApexChart title="Arus" data={dataY} categories={dataX} />
                                </div>
                                <div className={styles.leftMid}>
                                    <ApexChart title="Total Daya Listrik" data={dataY} categories={dataX} />
                                </div>
                            </div>
                            <div className={styles.rightMain}>
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
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}

export default TemperatureEnergy;
