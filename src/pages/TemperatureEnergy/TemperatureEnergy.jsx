import React, { useState, useEffect } from "react";
import { Skeleton, Switch, Input, Checkbox } from "antd";
import { Link } from "react-router-dom";
import styles from "./TemperatureEnergy.module.css";
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";
import TEMPLOGO from "../../assets/imgs/temp-zahro.png"
import ERCICON from "../../assets/imgs/erc-zahro.png"
import ApexChart from "../../components/charts/ApexChart";
import HEADING from "../../assets/imgs/dashboard-heading.png"
import axios from "axios";
function TemperatureEnergy() {
    const [options, setOptions] = useState([{
        label: 'Tegangan',
        value: 'TEGANGAN',
    },
    {
        label: 'Arus',
        value: 'ARUS',
    }, {
        label: 'Daya',
        value: 'DAYA',
    }])

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
    const [dataCheck, setDataCheck] = useState([])
    const [data, setData] = useState([])
    const [checked, setChecked] = useState(['TEGANGAN', 'ARUS', 'DAYA'])
    const onChange = (checkedValues) => {
        const newData = [];
        checkedValues.forEach((value) => {
            const dataItem = dataCheck.find((item) => item.name === value);
            if (dataItem) {
                newData.push(dataItem);
            }
        });
        setData(newData);
        console.log(data)
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://api-ecoref.project101.site/api/data-sensor');
                console.log(response)
                // Urutkan data dari created_at paling awal ke paling akhir
                const sortedData = response.data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

                // Buat objek untuk menyimpan data sementara
                const tempData = {
                    temp1: [],
                    temp2: [],
                    temp3: [],
                    arus: [],
                    tegangan: [],
                    daya: [],
                    status: [],
                };

                // Iterasi setiap data dan tambahkan ke objek sesuai dengan tempatnya
                sortedData.forEach((item) => {
                    const values = item.value.split('#');
                    const date = item.created_at.split(' ')[0] + ' ' + item.created_at.split(' ')[1].replace('Z', 'Z');

                    tempData.arus.push([date, parseInt(values[3])]);
                    tempData.tegangan.push([date, parseInt(values[4])]);
                    tempData.daya.push([date, parseInt(values[5])]);
                });

                // Hitung rata-rata untuk TEMP ERC
                const tempERC = [];
                for (let i = 0; i < tempData.temp1.length; i++) {
                    const avg = Math.floor((tempData.temp1[i][1] + tempData.temp2[i][1] + tempData.temp3[i][1]) / 3); // konversi value ke integer dengan Math.floor()
                    tempERC.push([tempData.temp1[i][0], avg]);
                }

                // Simpan data ke dalam bentuk yang diinginkan
                const formattedData = [
                    {
                        name: 'TEGANGAN',
                        data: tempData.tegangan,
                    },
                    {
                        name: 'ARUS',
                        data: tempData.arus,
                    },
                    {
                        name: 'DAYA',
                        data: tempData.daya,
                    },
                ];
                console.log(tempData.status)
                console.log(formattedData);
                setData(formattedData)
                setDataCheck(formattedData)
                console.log(data)
                console.log(dataCheck)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error(error);
            }
        };

        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 10000);

        return () => clearInterval(interval);
    }, []);



    return (
        <DashboardLayout>
            {loading ? (
                <Skeleton />
            ) : (
                <div className={styles.wrapper}>
                    <div className={styles.topWrapper}>
                        <h2 className={styles.pageTitle}>Monitoring Energi</h2>
                        <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
                            <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
                                Home
                            </Link>
                            <Typography className={styles.breadUnactive}>Monitoring Energi</Typography>
                        </Breadcrumbs>
                    </div>
                    <div className={styles.main}>
                        {/* -------------------HEADING--------------- */}

                        {/* ------------------RESUME--------------- */}

                        {/* -------------------MAINCONTENT--------------- */}
                        <div className={styles.mainContent}>
                            <div className={styles.leftMain}>
                                <div className={styles.leftMid}>
                                    <ApexChart title="Monitoring Energi" data={data} />
                                    <Checkbox.Group options={options} defaultValue={['TEGANGAN', 'ARUS', "DAYA"]} onChange={onChange} />
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
