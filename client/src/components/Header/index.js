/** @format */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Container,
  useScrollTrigger,
  Slide,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

import { logout } from "store/actions/auth.action";
import { handleContact } from "store/actions/contact.action";

import { headerData } from "../../data/static-data";

import "../../css/Header/index.css";
import DarkMode from "components/DarkMode";

const drawerWidth = 240;
const navItems = headerData.pages;

const Header = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const LogoutButton = isLoggedIn ? (
    <Button
      className="button"
      variant="contained"
      startIcon={<LogoutIcon className="icon" />}
      size="medium"
      sx={{
        ml: 2,
        backgroundColor: "#000",
        ":hover": { backgroundColor: "#000" },
      }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  ) : (
    ""
  );

  const ContactButton = (
    <Button
      className="button"
      variant="contained"
      size="medium"
      sx={{
        ml: 2,
        mb: {
          xs: 2,
          md: 0,
        },
        backgroundColor: "#000",
        ":hover": { backgroundColor: "#000" },
      }}
      onClick={() => dispatch(handleContact())}
    >
      Contact
    </Button>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ m: 2 }}>
        <Link to="/" className="drawer">
          {headerData.logoText}
        </Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link to={item} key={item} className="drawer">
            <ListItem disablePadding>
              <ListItemButton sx={{ px: 2 }}>
                <ListItemText
                  primary={item === "news" ? "news coverage" : item}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        {!isLoggedIn && ContactButton}
        {LogoutButton}
      </List>
    </Box>
  );

  const container =
    props.window !== undefined ? () => window().document.body : undefined;

  const HideOnScroll = ({ children }) => {
    const trigger = useScrollTrigger();

    return (
      <Slide appear={false} direction={"down"} in={!trigger}>
        {children}
      </Slide>
    );
  };

  return (
    <header>
      <Box sx={{ display: "flex" }}>
        <HideOnScroll>
          <AppBar
            component="nav"
            sx={{
              paddingTop: "4px",
              paddingBottom: "4px",
            }}
            className={pathname === "/" && !isLoggedIn ? "landing-page" : ""}
          >
            <Container>
              <Toolbar style={{ padding: 0 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    display: { /* xs: "none", */ md: "block" },
                  }}
                >
                  <Link to="/" className="nav">
                    {headerData.logoText}
                  </Link>
                </Typography>
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  {navItems.map((item) => (
                    <Button key={item} sx={{ color: "#fff" }}>
                      <Link to={item} className="nav">
                        {item === "news" ? "news coverage" : item}
                      </Link>
                    </Button>
                  ))}
                  {!isLoggedIn && ContactButton}
                  {LogoutButton}
                </Box>
                <IconButton
                  className="icon"
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { md: "none" }, color: "#000" }}
                >
                  <MenuIcon />
                </IconButton>
                <DarkMode />
              </Toolbar>
            </Container>
          </AppBar>
        </HideOnScroll>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </header>
  );
};

export default Header;
