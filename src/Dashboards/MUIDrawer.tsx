import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Data } from "./data";
// Pages
// import { UIDashboard } from "../Pages/Dashboard/UIdashboard";
import { People } from "../Pages/Staff/People";
import { Organization } from "../Pages/Staff/Organization";
import { Customers } from "../Pages/Customer/Customer";
import { Invoice } from "../Pages/Sales/Invoice";
import { Payment } from "../Pages/Sales/Payment";
import { RecentTransaction } from "../Pages/Transaction/RecentDeposit";
import { AllTransaction } from "../Pages/Transaction/AllTransaction";
import { ArchivedTask } from "../Pages/Task/ArchivedTask";
import { RunnigTask } from "../Pages/Task/RunningTask";
import { ClientPayment } from "../Pages/Account/ClientPayment";
import { ExpenseManagement } from "../Pages/Account/ExpensePayment";
import { Product } from "../Pages/Product Manager/Product";
import { Warehous } from "../Pages/Product Manager/Warehouse";
import { DealingInfo } from "../Pages/Report/DealingInfo";
import { ClientReport } from "../Pages/Report/ClientReport";
import { ExpenseReport } from "../Pages/Report/ExpenseReport";
import { Employee } from "../Pages/Employee/Employee";
import { Project } from "../Pages/Project/Project";
import { SalaryGrade } from "../Pages/Payroll/SalaryGrade";
import { EmployeeSalaryList } from "../Pages/Payroll/EmployeeSalaryList";
import { Attandence } from "../Pages/Attendance/Attendance";
import { Subscription } from "../Pages/Subscripton/Subscription";
import { NoticeBoard } from "../Pages/Notice Board/NoticeBoard";
import { Setting } from "../Pages/Setting/Setting";
import { Support } from "../Pages/Support/Support";
//logo
// import Logo from "../Images/logo.webp";
import { Avatar, Menu, MenuItem } from "@mui/material";
// import axios from "axios";
import Home from "../UserPage/Home";
const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  // background: "linear-gradient(to right, #392196, #ff69b4)",
  // minHeight: "100vh",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
//AppBar Style
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#392196",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(true);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleDrawerClose();
  };

  const RandomId = () => `id-${Math.random()}`;

  const handleItemClick = (text: string, hasSubItems: boolean) => {
    if (!hasSubItems) {
      handleNavigation(text.toLowerCase()); // Navigate if no sub-items
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("Token being sent for logout:", token);
      // Fetch the logout API to invalidate the session or token on the server
      const response = await fetch(
        `https://crm-backend-sage.vercel.app/api/v1/users/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Sending the token for authorization
          },
        }
      );

      if (response.ok) {
        // Clear tokens from localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // Navigate to login or home page after successful logout
        navigate("/");
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }), color: "black" }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "white" }}
          >
            Admin Dashboard
          </Typography>
          <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
            <Avatar></Avatar>
          </IconButton>

          {/* Menu (Name and Logout) */}
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            // open={false}
            sx={{ mt: "45px" }}
          >
            <MenuItem onClick={handleCloseMenu}>
              {localStorage.getItem("username")}
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {/* SideBar Start*/}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#4126ab", // Set background color here
            color: "white", // Optional: Set text color to white
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          style={{
            backgroundColor: "#392196",
            borderBottom: "1px solid white",
          }}
        >
          {/* <div className="flex items-center justify-center">
            <img className="w-36 h-36" src={Logo} alt="Logo" />
          </div> */}
          <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <SimpleTreeView>
          {Data.map((item, index) => {
            return (
              <TreeItem
                sx={{
                  cursor: "pointer",
                  color: "white",
                  ":hover": { backgroundColor: "primary.dark" },
                  ":active": { backgroundColor: "primary.light" },
                }}
                itemId={RandomId()}
                label={item.text}
                key={index}
                onClick={() => handleItemClick(item.text, !!item.subItems)}
              >
                {item.subItems?.map((subItem, subIndex) => {
                  return (
                    <TreeItem
                      key={subIndex}
                      sx={{
                        cursor: "pointer",
                        color: "white",
                        ":hover": { backgroundColor: "primary.dark" },
                        ":active": { backgroundColor: "primary.light" },
                      }}
                      itemId={RandomId()}
                      label={subItem.text}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleNavigation(subItem.text.toLowerCase());
                      }}
                    />
                  );
                })}
              </TreeItem>
            );
          })}
        </SimpleTreeView>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Dashboard" element={<Home />} />
          <Route path="People" element={<People />} />
          <Route path="Organization" element={<Organization />} />
          <Route path="Customer" element={<Customers />} />
          <Route path="Invoices" element={<Invoice />} />
          <Route path="Payment" element={<Payment />} />
          <Route path="Recent Deposit" element={<RecentTransaction />} />
          <Route path="All Transaction" element={<AllTransaction />} />
          <Route path="Running Task" element={<RunnigTask />} />
          <Route path="Archived Task" element={<ArchivedTask />} />
          <Route path="Client Payment" element={<ClientPayment />} />
          <Route path="Expense Management" element={<ExpenseManagement />} />
          <Route path="Products" element={<Product />} />
          <Route path="Warehouse" element={<Warehous />} />
          <Route path="Dealing info" element={<DealingInfo />} />
          <Route path="Client Report" element={<ClientReport />} />
          <Route path="Expense Report" element={<ExpenseReport />} />
          <Route path="Employee" element={<Employee />} />
          <Route path="Project" element={<Project />} />
          <Route path="Salary Grade" element={<SalaryGrade />} />
          <Route path="Employee Salary List" element={<EmployeeSalaryList />} />
          <Route path="Attendance" element={<Attandence />} />
          <Route path="Subscription" element={<Subscription />} />
          <Route path="Notice Board" element={<NoticeBoard />} />
          <Route path="Support" element={<Support />} />
          <Route path="Setting" element={<Setting />} />
        </Routes>
      </Main>
    </Box>
  );
}
