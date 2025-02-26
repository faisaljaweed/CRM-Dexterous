import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { lineChartData } from "./Fake_Data";
// import { useEffect } from "react";
// import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = () => {
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
  };
  // useEffect(() => {
  //   const getAllTask = () => {
  //     try {
  //       const token = localStorage.getItem("accessToken");
  //       if (!token) {
  //         return;
  //       }
  //       const response = axios.get(
  //         "https://crm-backend-sage.vercel.app/api/v1/dashboard/getalltasks",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       console.log(response);
  //     } catch (error) {
  //       console.log("Error", error);
  //     }
  //   };
  //   getAllTask();
  // }, []);
  return (
    <div className="w-96 h-96">
      <Line className="text-white" options={options} data={lineChartData} />;
    </div>
  );
};
export default LineGraph;
