import React, { useState, useEffect } from "react";
import { Skeleton, Switch, Input, Carousel, Checkbox, message } from "antd";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";
import TEMPLOGO from "../../assets/imgs/temp-zahro.png"
import ERCICON from "../../assets/imgs/erc-zahro.png"
import ApexChart from "../../components/charts/ApexChart";
import ApexChart2 from "../../components/charts/ApexChart2";
import HEADING from "../../assets/imgs/dashboard-heading.png"
import axios from "axios";
function Dashboard() {
  const [options, setOptions] = useState([{
    label: 'Temperature 1',
    value: 'TEMP 1',
  },
  {
    label: 'Temperature 2',
    value: 'TEMP 2',
  }, {
    label: 'Temperature 3',
    value: 'TEMP 3',
  }, {
    label: 'Temperature ERC',
    value: 'TEMP ERC',
  },])
  const [dataStatus, setDataStatus] = useState([])
  const [dataCheck, setDataCheck] = useState([])
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

  const [tempCard1, setTempCard1] = useState(null)
  const [tempCard2, setTempCard2] = useState(null)
  const [tempCard3, setTempCard3] = useState(null)
  const [tempCard4, setTempCard4] = useState(null)
  const [statusCard, setStatusCard] = useState("0")
  const [notifikasi, setNotifikasi] = useState({
    minimum: 0,
    maximum: 0
  })
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [data, setData] = useState([])

  const [checked, setChecked] = useState(['TEMP 1', 'TEMP 2', 'TEMP 3', 'TEMP ERC'])
  const onChange = (checkedValues) => {
    const newData = [];
    checkedValues.forEach((value) => {
      const dataItem = dataCheck.find((item) => item.name === value);
      if (dataItem) {
        newData.push(dataItem);
      }
    });
    setData(newData);
  };

  const changeNotifikasi = (event) => {
    const { name, value } = event.target;
    setNotifikasi(prevState => ({
      ...prevState,
      [name]: [value]
    }));
    console.log(notifikasi)
  }



  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('http://api-ecoref.project101.site/api/data-sensor');
        const response = await axios.get('http://api-ecoref.project101.site/api/data-sensor');
        // Urutkan data dari created_at paling awal ke paling akhir
        const sortedData = response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        // Buat objek untuk menyimpan data sementara
        const tempData = {
          temp1: [],
          temp2: [],
          temp3: [],
          tegangan: [],
          daya: [],
          status: [],
          setPoint: [],
        };

        const lastIndex = response.data.length - 1;
        const lastItem = response.data[lastIndex];
        const lastVal = lastItem.value.split('#')
        console.log("last", lastVal);
        setTempCard1(lastVal[0])
        setTempCard2(lastVal[1])
        setTempCard3(lastVal[2])
        setTempCard4(Math.round((parseInt(lastVal[0]) + parseInt(lastVal[1]) + parseInt(lastVal[2])) / 3))
        setStatusCard(lastVal[6])
        if (tempCard4 < notifikasi.minimum) {
          message.warn("Temperature di bawah minimum")

          let data = JSON.stringify({
            "message": "Temperature anda dibawah minimum"
          });

          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://api-ecoref.project101.site/api/list-notifikasi',
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          };

          axios.request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (tempCard4 > notifikasi.maximum) {
          message.warn("Temperature di atas maximum")

          let data = JSON.stringify({
            "message": "Temperature anda diatas maximum"
          });

          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://api-ecoref.project101.site/api/list-notifikasi',
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          };

          axios.request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
              console.log(error);
            });
        }
        // Iterasi setiap data dan tambahkan ke objek sesuai dengan tempatnya
        response.data.forEach((item) => {
          const values = item.value.split('#');
          const date = item.dateInsert;

          console.log(values)

          tempData.temp1.push([date, parseInt(values[0])]); // konversi value ke integer dengan parseInt()
          tempData.temp2.push([date, parseInt(values[1])]);
          tempData.temp3.push([date, parseInt(values[2])]);
          tempData.tegangan.push([date, parseInt(values[3])]);
          tempData.daya.push([date, parseInt(values[4])]);
          tempData.status.push([date, parseInt(values[6])]);
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
            name: 'TEMP 1',
            data: tempData.temp1,
          },
          {
            name: 'TEMP 2',
            data: tempData.temp2,
          },
          {
            name: 'TEMP 3',
            data: tempData.temp3,
          },
          {
            name: 'TEMP ERC',
            data: tempERC,
          },
        ];
        console.log(tempData.status)
        console.log(formattedData);
        setDataStatus(tempData.status)
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

    const fetchNotifikasi = async () => {
      try {
        const response2 = await axios.get('http://api-ecoref.project101.site/api/set-notifikasi/1');
        console.log("res2", response2)
        setNotifikasi({
          minimum: response2.data.minimum,
          maximum: response2.data.maximum
        })
        setLoading2(false)
      } catch (error) {
        setLoading2(false)
        console.error(error);
      }
    }

    fetchData();
    fetchNotifikasi()

    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const setNotification = () => {
    let dataBody = JSON.stringify({
      "minimum": notifikasi.minimum,
      "maximum": notifikasi.maximum
    });

    let config = {
      method: 'put',
      url: 'http://api-ecoref.project101.site/api/set-notifikasi/1',
      headers: {
        'Content-Type': 'application/json'
      },
      data: dataBody
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        message.success("Set Notifikasi Berhasil")
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <DashboardLayout>
      {loading && loading2 ? (
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
              <div >
                <div className={styles.resumeCard}>
                  <img src={TEMPLOGO} alt="temp icon" className={styles.iconresume} />
                  <div className={styles.resumeDesc}>
                    <p className={styles.resumeTitle}>Temperature Sensor 1</p>
                    <p className={styles.resumeValue}>{tempCard1} <sup>o</sup>C</p>
                  </div>
                </div>
              </div>

              <div >
                <div className={styles.resumeCard}>
                  <img src={TEMPLOGO} alt="temp icon" className={styles.iconresume} />
                  <div className={styles.resumeDesc}>
                    <p className={styles.resumeTitle}>Temperature Sensor 2</p>
                    <p className={styles.resumeValue}>{tempCard2} <sup>o</sup>C</p>
                  </div>
                </div>
              </div>

              <div >
                <div className={styles.resumeCard}>
                  <img src={TEMPLOGO} alt="temp icon" className={styles.iconresume} />
                  <div className={styles.resumeDesc}>
                    <p className={styles.resumeTitle}>Temperature Sensor 3</p>
                    <p className={styles.resumeValue}>{tempCard3} <sup>o</sup>C</p>
                  </div>
                </div>
              </div>

              <div >
                <div className={styles.resumeCard}>
                  <img src={TEMPLOGO} alt="temp icon" className={styles.iconresume} />
                  <div className={styles.resumeDesc}>
                    <p className={styles.resumeTitle}>Temperature Sensor ERC</p>
                    <p className={styles.resumeValue}>{tempCard4} <sup>o</sup>C</p>
                  </div>
                </div>
              </div>

              {/* <div className={styles.resumeCard}>
                <img src={ERCICON} alt="temp icon" className={styles.iconresume} />
                <div className={styles.resumeDesc}>
                  <p className={styles.resumeTitle}>Temperature ERC</p>
                  <p className={styles.resumeValue}>-90 <sup>o</sup>C</p>
                </div>
              </div> */}
            </div>
            {/* -------------------MAINCONTENT--------------- */}
            <div className={styles.mainContent}>
              <div className={styles.leftMain}>
                <div className={styles.leftMid}>
                  <ApexChart title="Grafik Temperature" data={data} />
                  <Checkbox.Group options={options} defaultValue={['TEMP 1', 'TEMP 2', "TEMP 3", 'TEMP ERC']} onChange={onChange} />
                </div>
                <div className={styles.leftMid}>
                  <ApexChart2 />
                </div>
                <div className={styles.leftBottom}>
                  <h3 className={styles.titleLeftBottom}>Control Temperature</h3>
                  <div className={styles.controlLeftBottom}>
                    <p className={styles.descLeftBottom}>Compressor Status</p>
                    {
                      statusCard === "1" ?
                        <div className={styles.compStatus} style={{ background: "green", color: "white", padding: "8px", borderRadius: "8px" }}>ON</div> :
                        <div className={styles.compStatus} style={{ background: "red", color: "white", padding: "8px", borderRadius: "8px" }}>OFF</div>
                    }
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
                    {/* <button className={styles.btnSet}>Reset</button> */}
                  </div>
                </div>
                <div className={styles.leftBottom}>
                  <h3 className={styles.titleLeftBottom}>Control Notifikasi</h3>
                  <div className={styles.formField}>
                    <label htmlFor="whatsapp" className={styles.label}>
                      Set Minimum Notifikasi
                    </label>
                  </div>
                  <div className={styles.setBoxs}>
                    <Input required type="number" className={styles.input} name="minimum" value={notifikasi.minimum} onChange={changeNotifikasi} />
                    <p className={styles.setCelcius}><sup>o</sup>C</p>
                    <button className={styles.btnSet} onClick={setNotification}>Set</button>
                  </div>
                  <div className={styles.formField}>
                    <label htmlFor="whatsapp" className={styles.label}>
                      Set Maximum Notifikasi
                    </label>
                  </div>
                  <div className={styles.setBoxs}>
                    <Input required type="number" className={styles.input} name="maximum" value={notifikasi.maximum} onChange={changeNotifikasi} />
                    <p className={styles.setCelcius}><sup>o</sup>C</p>
                    <button className={styles.btnSet} onClick={setNotification}>Set</button>
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
      )
      }
    </DashboardLayout >
  );
}

export default Dashboard;
