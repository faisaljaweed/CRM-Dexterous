import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import PersistentDrawerLeft from "./Dashboard/MUIDrawer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<div>Login</div>} />
      <Route path="/drawer/*" element={<PersistentDrawerLeft />} />
    </>
  )
);
export default router;
