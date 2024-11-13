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
