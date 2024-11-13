import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { pieChartData } from "./Fake_Data";

ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <div className="w-96 h-96">
      <Pie options={options} data={pieChartData} />;
    </div>
  );
};
export default PieChart;
