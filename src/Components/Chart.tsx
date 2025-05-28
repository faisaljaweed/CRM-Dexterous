import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { BarChartData } from "./Fake_Data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const BarChart = () => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <div className="w-96 h-96">
      <Bar options={options} data={BarChartData} />
    </div>
  );
};
export default BarChart;
// import { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartOptions,
//   ChartData,
// } from "chart.js";
// import axios from "axios";
// // import { BarChartData } from "./Fake_Data";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );
// const BarChart = () => {
//   const options: ChartOptions<"bar"> = {
//     responsive: true,
//     maintainAspectRatio: false,
//   };
//   const [graphData, setGraphData] = useState<ChartData<"bar">>();
//   useEffect(() => {
//     const getAllTask = () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//           return;
//         }
//         const response = axios.get(
//           "https://crm-backend-sage.vercel.appapi/v1/dashboard/getalltasks",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log(response);
//       } catch (error) {
//         console.log("Error", error);
//       }
//     };
//     getAllTask();
//   }, []);
//   return (
//     <div>
//       <Bar options={options} data={graphData} />
//     </div>
//   );
// };

// export default BarChart;
