import { useState, useEffect } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.log("No token found");
          return;
        }

        const res = await axios.get(
          "https://crm-backend-sage.vercel.appapi/v1/tasks/getAllTasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const tasks = res.data.data;

        const taskLabels = tasks.map((task: any) => task.title);
        const taskData = tasks.map((task: any) => Number(task.status) || 0);
        console.log(taskLabels, taskData);
        setData({
          labels: taskLabels,
          datasets: [
            {
              label: "Tasks Completed (Line Chart)",
              data: taskData,
              borderColor: "rgb(75,192,192)",
              fill: false,
            },
            {
              label: "Tasks Completed (Bar Chart)",
              data: taskData,
              backgroundColor: "rgba(75,192,192,0.2)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      {data ? (
        <>
          <div style={{ width: "600px", height: "400px" }}>
            <Line data={data} options={options} />
          </div>
          <div style={{ width: "600px", height: "400px" }}>
            <Bar data={data} options={options} />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
