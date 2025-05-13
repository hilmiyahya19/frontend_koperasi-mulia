import { useEffect, useState, useRef } from "react";
import { getMemberStats } from "../../../api/reportApi";
import ApexCharts from "apexcharts";

const MemberStats = () => {
  const [stats, setStats] = useState(null);
  const chartRef = useRef(null); // Simpan referensi chart

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMemberStats();
      setStats(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (stats) {
      const options = {
        chart: {
          height: "100%",
          maxWidth: "100%",
          type: "area",
          fontFamily: "Inter, sans-serif",
          dropShadow: { enabled: false },
          toolbar: { show: false },
        },
        tooltip: {
          enabled: true,
          x: { show: false },
          y: {
            formatter: (value) => `${value}`,
          },
          theme: "dark",
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#1C64F2",
            gradientToColors: ["#1C64F2"],
          },
        },
        dataLabels: { enabled: false },
        stroke: { width: 6 },
        grid: { show: false, strokeDashArray: 4 },
        series: [
          {
            name: "anggota baru",
            data: stats?.monthlyMembers.map((m) => m.count) || [],
            color: "#1A56DB",
          },
        ],
        xaxis: {
          categories: stats?.monthlyMembers.map((m) => m.month) || [],
          labels: { show: false },
          axisBorder: { show: false },
          axisTicks: { show: false },
        },
        yaxis: { show: false },
      };

      const chartElement = document.getElementById("area-chart");
      if (chartElement) {
        // Hapus chart lama jika ada
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        // Buat chart baru
        chartRef.current = new ApexCharts(chartElement, options);
        chartRef.current.render();
      }
    }

    // Cleanup saat komponen unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [stats]);

  return (
    <div className="w-full rounded-lg shadow-sm bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-white pb-2">
            {stats ? stats.totalMembers : "Loading..."}
          </h5>
          <p className="text-base font-normal text-gray-400">Total Anggota</p>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 text-center">
          {stats ? `${stats.newMembers} anggota baru` : "Loading..."}
        </div>
      </div>
      <div id="area-chart"></div>
    </div>
  );
};

export default MemberStats;
