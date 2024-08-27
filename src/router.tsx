import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import PersistentDrawerLeft from "./Dashboards/MUIDrawer";
import LoginScreen from "./Components/Login";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/drawer/*" element={<PersistentDrawerLeft />} />
    </Route>
  )
);
export default router;
