import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import PersistentDrawerLeft from "./Dashboards/MUIDrawer";
import LoginScreen from "./Components/Login";
import ErrorPage from "./ErrorPage";
import UserDashboard from "./Dashboards/UserDashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/drawer/*" element={<PersistentDrawerLeft />} />
      <Route path="/userDashboard/*" element={<UserDashboard />} />
    </Route>
  )
);
export default router;
