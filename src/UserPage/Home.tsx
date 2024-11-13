import BarChart from "../Components/Chart";
import LineGraph from "../Components/Line";
import PieChart from "../Components/Pie";

const Home = () => {
  return (
    <>
      <main className="flex justify-around">
        <LineGraph />
        <BarChart />
      </main>
      <main className="flex justify-center items-center">
        <PieChart />
      </main>
    </>
  );
};
export default Home;
