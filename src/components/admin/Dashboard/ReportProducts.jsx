import { useEffect, useState, useRef } from "react";
import ApexCharts from "apexcharts";
import { getTopProducts } from "../../../api/reportApi";

const TopProducts = () => {
  const [topProducts, setTopProducts] = useState([]);
  const chartRef = useRef(null); // Simpan referensi chart

  useEffect(() => {
    const fetchTopProducts = async () => {
      const data = await getTopProducts();
      if (data && data.topSellingProducts) {
        setTopProducts(data.topSellingProducts);
        renderChart(data.topSellingProducts);
      }
    };
    fetchTopProducts();
  }, []);

  const renderChart = (products) => {
    const options = {
      chart: {
        type: "pie",
      },
      labels: products.map((p) => p.name),
      series: products.map((p) => p.sold),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };

    const chartElement = document.querySelector("#pie-chart");
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
      <div className="flex justify-between items-start w-full">
        <h5 className="text-xl font-bold text-gray-900 dark:text-white">Produk Terlaris</h5>
      </div>
      <div id="pie-chart" className="py-6"></div>
      <ul className="mt-4 space-y-2">
        {topProducts.map((product, index) => (
          <li key={index} className="flex justify-between text-gray-700 dark:text-gray-300">
            <span>{product.name}</span>
            <span className="font-semibold">{product.sold}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopProducts;
