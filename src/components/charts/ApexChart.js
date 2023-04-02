import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = ({ data, title }) => {
  const [series, setSeries] = React.useState(data);

  const [options, setOptions] = React.useState({
    chart: {
      type: "area",
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
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: title,
      align: "left",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
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

  return (
    <div id="chart">
      <ReactApexChart options={options} series={data} type="area" height={500} />
    </div>
  );
};

export default ApexChart;
