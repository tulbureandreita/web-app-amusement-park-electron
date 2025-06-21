import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Grid,
  CircularProgress,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";
import useStyles from "./styles";

const HomePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [matchedFoldersData, setMatchedFoldersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Only redo this call if uuids from face recognition script changes
  useEffect(() => {
    const start = Date.now();
    let timeoutId;

    axios
      .post("/api/match", {
        uuids: [
          "dfea7a8a-b3c2-4bc7-b5f8-b177eb64ec50",
          "dfea7a8a-b3c2-4bc7-b5f8-b177eb642510",
        ],
      })
      .then((res) => {
        setMatchedFoldersData(res.data);

        const elapsed = Date.now() - start;
        const delay = Math.max(300 - elapsed, 0);

        timeoutId = setTimeout(() => {
          setLoading(false);
        }, delay);
      })
      .catch((error) => {
        console.error("Axios error:", error);
        setLoading(false);
      });

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Box className={classes.mainWrapper}>
      <Typography variant="h5" gutterBottom>
        {t("homeTitle")}
      </Typography>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 7,
          }}
        >
          <CircularProgress />
        </Box>
      ) : matchedFoldersData.length > 0 ? (
        <Grid container spacing={3}>
          {matchedFoldersData.map((folder) => (
            <Grid key={folder.folderId}>
              <Box className={classes.folderCard}>
                <IconButton
                  className={classes.folderIconButton}
                  onClick={() => navigate(`/app/${folder.folderId}`)}
                >
                  <FolderIcon className={classes.folderIcon} />
                </IconButton>
                <Box className={classes.folderFooter}>
                  <Typography variant="body2">{folder.folderId}</Typography>
                  <Tooltip title="Copy ID">
                    <IconButton
                      size="small"
                      onClick={() => handleCopy(folder.folderId)}
                    >
                      <ContentCopyIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="textPrimary" sx={{ mt: 4 }}>
          {t("homeEmptyData")}
        </Typography>
      )}
    </Box>
  );
};

export default HomePage;
