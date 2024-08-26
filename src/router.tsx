import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import PersistentDrawerLeft from "./Dashboards/MUIDrawer";
import LoginScreen from "./Components/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/drawer/*" element={<PersistentDrawerLeft />} />
    </>
  )
);
export default router;
