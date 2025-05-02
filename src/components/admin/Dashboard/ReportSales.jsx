import { useEffect, useState, useRef } from "react";
import ApexCharts from "apexcharts";
import { getSalesStats } from "../../../api/reportApi";

const SalesStatsChart = () => {
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    totalRevenue: 0,
    monthlySales: [],
  });

  const chartRef = useRef(null); // Simpan referensi chart

  useEffect(() => {
    const fetchSalesStats = async () => {
      const data = await getSalesStats();
      if (data) {
        setSalesData(data);
        renderChart(data.monthlySales);
      }
    };
    fetchSalesStats();
  }, []);

  const renderChart = (monthlySales) => {
    const options = {
      chart: {
        height: "100%",
        maxWidth: "100%",
        type: "line",
        fontFamily: "Inter, sans-serif",
        dropShadow: { enabled: false },
        toolbar: { show: false },
      },
      tooltip: {
        enabled: true,
        theme: "dark",
        marker: { show: true },
        x: { show: false },
      },
      dataLabels: { enabled: false },
      stroke: { width: 6, curve: "smooth" },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: { left: 2, right: 2, top: -26 },
      },
      series: [
        {
          name: "penjualan",
          data: monthlySales.map((entry) => entry.sales),
          color: "#1A56DB",
        },
        {
          name: "pendapatan",
          data: monthlySales.map((entry) => entry.revenue),
          color: "#7E3AF2",
        },
      ],
      legend: { show: false },
      xaxis: {
        categories: monthlySales.map((entry) => entry.month),
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: { show: false },
    };

    const chartElement = document.getElementById("line-chart");
    if (chartElement) {
      // Hapus chart lama jika ada
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Buat chart baru
      chartRef.current = new ApexCharts(chartElement, options);
      chartRef.current.render();
    }
  };

  // Cleanup saat komponen unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between mb-5">
        <div className="grid gap-4 grid-cols-2">
          <div>
            <h5 className="text-gray-500 dark:text-gray-400 leading-none font-normal mb-2">Total Penjualan</h5>
            <p className="text-gray-900 dark:text-white text-2xl leading-none font-bold">{salesData.totalSales}</p>
          </div>
          <div>
            <h5 className="text-gray-500 dark:text-gray-400 leading-none font-normal mb-2">Total Pendapatan</h5>
            <p className="text-gray-900 dark:text-white text-2xl leading-none font-bold">Rp{salesData.totalRevenue}</p>
          </div>
        </div>
      </div>
      <div id="line-chart"></div>
    </div>
  );
};

export default SalesStatsChart;
