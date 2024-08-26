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

const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
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
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
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
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
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
                itemId={RandomId()}
                label={item.text}
                key={index}
                onClick={() => handleItemClick(item.text, !!item.subItems)}
              >
                {item.subItems?.map((subItem, subIndex) => {
                  return (
                    <TreeItem
                      key={subIndex}
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
          <Route path="Dashboard" element={<div>Dashboard</div>} />
          <Route path="People" element={<div>People</div>} />
          <Route path="Organization" element={<div>Organization</div>} />
          <Route path="Customer" element={<div>Customer</div>} />
          <Route path="Invoices" element={<div>Invoices</div>} />
          <Route path="Payment" element={<div>Payment</div>} />
          <Route path="Recent Deposit" element={<div>Recent Deposit</div>} />
          <Route path="All Transaction" element={<div>All Transaction</div>} />
          <Route path="Running Task" element={<div>Running Task</div>} />
          <Route path="Archived Task" element={<div>Archived Task</div>} />
          <Route path="Client Payment" element={<div>Client Payment</div>} />
          <Route
            path="Expense Management"
            element={<div>Expense Management</div>}
          />
          <Route path="Products" element={<div>Products</div>} />
          <Route path="Warehouse" element={<div>Warehouse</div>} />
          <Route path="Dealing info" element={<div>Dealing info</div>} />
          <Route path="Client Report" element={<div>Client Report</div>} />
          <Route path="Expense Report" element={<div>Expense Report</div>} />
          <Route path="Employee" element={<div>Employee</div>} />
          <Route path="Project" element={<div>Project</div>} />
          <Route path="Salary Grade" element={<div>Salary Grade</div>} />
          <Route
            path="Employee Salary List"
            element={<div>Employee Salary List</div>}
          />
          <Route path="Attendance" element={<div>Attendance</div>} />
          <Route path="Subscription" element={<div>Subscription</div>} />
          <Route path="Notice Board" element={<div>Notice Board</div>} />
          <Route path="Support" element={<div>Support</div>} />
          <Route path="Setting" element={<div>Setting</div>} />
        </Routes>
      </Main>
    </Box>
  );
}
