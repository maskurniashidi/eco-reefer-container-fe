import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
const ApexChart2 = () => {
  const [dataChart, setDataChart] = useState([]);
  const [series, setSeries] = useState([
    {
      data: dataChart,
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      type: "line",
      stacked: false,
      height: 500,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    stroke: {
      curve: "stepline",
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "Control Temperature",
      align: "left",
    },
    yaxis: {
      labels: {},
      title: {
        text: "",
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      x: {
        format: "yyyy-mm-dd hh:mm:ss",
      },
      fixed: {
        enabled: false,
        position: "topRight",
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://api-ecoref.project101.site/api/data-sensor");
        console.log(response);
        // Urutkan data dari created_at paling awal ke paling akhir
        const sortedData = response.data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

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

        // Iterasi setiap data dan tambahkan ke objek sesuai dengan tempatnya
        sortedData.forEach((item) => {
          const values = item.value.split("#");
          const date = item.created_at.split(" ")[0] + " " + item.created_at.split(" ")[1].replace("Z", "Z");

          tempData.temp1.push([date, parseInt(values[0])]); // konversi value ke integer dengan parseInt()
          tempData.temp2.push([date, parseInt(values[1])]);
          tempData.temp3.push([date, parseInt(values[2])]);
          tempData.tegangan.push([date, parseInt(values[3])]);
          tempData.daya.push([date, parseInt(values[4])]);
          tempData.status.push([date, parseInt(values[6])]);
        });

        const formattedData = [
          {
            data: tempData.status,
          },
        ];
        setSeries(formattedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default ApexChart2;
