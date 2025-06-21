import React, { useState } from "react";
import axios from "axios";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "react-i18next";
import useStyles from "./styles";

function NavigationContent() {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const handleTakePhoto = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/camera/take-photo");
      console.log("Photo taken:", res.data);
      navigate("/app/home");
    } catch (err) {
      console.error("Error taking photo:", err);
      alert(
        "Failed to take photo. Make sure camera is connected and gphoto2 is installed."
      );
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    sessionStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Logo
        </Typography>
      </Toolbar>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/app/home"
            selected={
              location.pathname === "/app/home" || location.pathname === "/app"
            }
          >
            <ListItemIcon style={{ marginRight: -20 }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={t("homeNavigationItem")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/app/search"
            selected={location.pathname === "/app/search"}
          >
            <ListItemIcon style={{ marginRight: -20 }}>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={t("searchNavigationItem")} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ my: 3 }} />
      <Box className={classes.takePicturesContainer}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={
            loading ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              <CameraAltIcon />
            )
          }
          className={classes.takePicturesButton}
          onClick={handleTakePhoto}
          disabled={loading}
        >
          {!loading && t("takePictureButton")}
        </Button>
      </Box>
      <Box sx={{ px: 2, mt: "auto", mb: "20px" }}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<LogoutIcon />}
          fullWidth
          onClick={logOut}
        >
          {t("logoutButton")}
        </Button>
      </Box>
    </>
  );
}

export default NavigationContent;
