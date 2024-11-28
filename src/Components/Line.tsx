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
  return (
    <div className="w-96 h-96">
      <Line className="text-white" options={options} data={lineChartData} />;
    </div>
  );
};
export default LineGraph;
