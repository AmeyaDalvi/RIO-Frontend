import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Image from "next/image";
import { Link } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

const pages = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
  { name: "Services", link: "/" },
  { name: "About Us", link: "/" },
];
const login = "Login";
const settings = ["Profile", "Account", "Dashboard"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const router = useRouter();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    Cookies.remove("rioUser");
    Cookies.remove("rioUserToken");
    router.replace("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        color: "#000",
        borderBottom: "0px solid #000",
        background: "transparent",
        backdropFilter: "blur(20px)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ padding: "0px !important" }}>
          <Box
            onClick={() => {
              router.push("/");
            }}
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              textDecoration: "none",
              marginBottom: "-5px",
              cursor: "pointer",
            }}
          >
            <Image
              src="/images/rio.png"
              width={60}
              height={25}
              alt="brand-image"
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => {
                    router.push(page.link);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center" sx={{ my: 2, color: "black" }}>
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link
            href="/"
            style={{ textDecoration: "none", marginBottom: "-5px" }}
            sx={{ display: { xs: "flex", md: "none" }, mr: 2, flexGrow: 1 }}
          >
            <Image
              src="/images/rio.png"
              width={60}
              height={25}
              alt="brand-logo"
              priority
            />
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              // mr: 7,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => {
                  router.push(page.link);
                  handleCloseNavMenu();
                }}
                sx={{
                  ml: 2,
                  display: "block",
                  color: "black",
                  fontWeight: "400",
                  ":hover": {
                    background: "black",
                    color: "white",
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {!Cookies.get("rioUserToken") ? (
            <Button
              key={login}
              onClick={() => router.push("/login")}
              sx={{
                ml: 2,
                display: "block",
                color: "black",
                fontWeight: "400",
                ":hover": {
                  background: "black",
                  color: "white",
                },
              }}
            >
              {login}
            </Button>
          ) : (
            <Box sx={{ flexGrow: 0, ml: 7 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="images/rio.png" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
                <MenuItem key="logout" onClick={logoutHandler}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
