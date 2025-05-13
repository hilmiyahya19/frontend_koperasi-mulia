import { useEffect, useState, useRef } from "react";
import { getFinanceStats } from "../../../api/reportApi";
import ApexCharts from "apexcharts";

const FinanceStats = () => {
  const [financeData, setFinanceData] = useState(null);
  const chartRef = useRef(null); // Simpan referensi chart

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFinanceStats();
      setFinanceData(data);

      if (data) {
        renderChart(data);
      }
    };
    fetchData();
  }, []);

  const renderChart = (data) => {
    const options = {
      series: [
        {
          name: "pemasukan",
          color: "#31C48D",
          data: data.monthlyReport.map((item) => item.income),
        },
        {
          name: "pengeluaran",
          color: "#F05252",
          data: data.monthlyReport.map((item) => item.expense),
        },
      ],
      chart: {
        type: "bar",
        width: "100%",
        height: 400,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 6,
          dataLabels: { position: "top" },
        },
      },
      xaxis: {
        categories: data.monthlyReport.map((item) => item.month),
        labels: {
          formatter: (value) => `Rp${value}`,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        theme: "dark",
        x: { show: false },
        y: {
          formatter: (value) => `Rp${value}`,
        },
      },
    };

    const chartElement = document.getElementById("bar-chart");
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
    <div className="w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Keuntungan</dt>
          <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
            Rp{financeData?.summary.netProfit}
          </dd>
        </dl>
      </div>
      <div className="grid grid-cols-2 py-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Pemasukan</dt>
          <dd className="leading-none text-xl font-bold text-green-500 dark:text-green-400">
            Rp{financeData?.summary.totalIncome}
          </dd>
        </dl>
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Pengeluaran</dt>
          <dd className="leading-none text-xl font-bold text-red-600 dark:text-red-500">
            -Rp{financeData?.summary.totalExpense}
          </dd>
        </dl>
      </div>
      <div id="bar-chart"></div>
    </div>
  );
};

export default FinanceStats;
