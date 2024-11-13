export const lineChartData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "Steps By Pedro",
      data: [3000, 5000, 4500, 6000, 8000, 7000, 9000],
      borderColor: "rgb(75,192,192)",
    },
    {
      label: "Steps By Pedro's Girlfriend",
      data: [3000, 5000, 5500, 8000, 1200, 11000, 15000],
      borderColor: "red",
    },
  ],
};

export const BarChartData = {
  labels: ["Rent", "Groceries", "Utilities", "Entertainment", "Transportation"],
  datasets: [
    {
      label: "Expenses",
      data: [1200, 300, 150, 180, 100],
      borderColor: "rgba(54,162,235,1)",
      borderWidth: 1,
      backgroundColor: "rgba(255,99,132,1)",
    },
  ],
};

export const pieChartData = {
  labels: ["Facebook", "Instagram", "Twitter", "Linkedin", "Youtube"],
  datasets: [
    {
      label: "Time Spent",
      data: [120, 60, 30, 90, 45],
      backgroundColor: [
        "rgba(255,99,132,0.9)",
        "rgba(54,162,235,0.9)",
        "rgba(255,206,86,0.9)",
        "rgba(75,192,192,0.9)",
        "rgba(153,102,255,0.9)",
      ],
      hoverOffset: 4,
    },
  ],
};
