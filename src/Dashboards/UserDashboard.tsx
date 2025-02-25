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
import { useNavigate, Routes, Route } from "react-router-dom";

//logo
import { Avatar, Menu, MenuItem } from "@mui/material";
import Home from "../UserPage/Home";
import Organizations from "../UserPage/Organization";
import Lead from "../UserPage/Lead";
import Times from "../UserPage/Time";
import Emails from "../UserPage/Email";
import UserData from "./userData";
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
// Start Style Navbar
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
// End Style Navbar
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function UserDashboard() {
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
      {/* Start Navbar */}
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
            User Dashboard
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
      {/* Start Navbar */}
      {/* Start Side Bar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#4126ab", // Set background color here
            color: "white", /// Optional: Set text color to white
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
          <div className="flex items-center justify-center">
            {/* <img className="w-36 h-36" src={Logo} alt="Logo" /> */}
          </div>
          <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <UserData />
      </Drawer>
      {/* End Side Bar */}
      {/* Start Main Screen */}
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/people" element={<Emails />} />
          <Route path="/Organization" element={<Organizations />} />
          <Route path="/Leads" element={<Lead />} />
          <Route path="/Organizations" element={<Organizations />} />
          <Route path="/Time" element={<Times />} />
          <Route path="/Emails" element={<Emails />} />
        </Routes>
      </Main>
      {/* End Main Screen */}
    </Box>
  );
}
