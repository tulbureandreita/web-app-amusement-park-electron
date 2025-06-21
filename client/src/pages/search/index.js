import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import { folders } from "../../mock/imageData";
import { useTranslation } from "react-i18next";
import { useFolders } from "../../context/foldersContext";
import useStyles from "./styles";

const SearchPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { folders, loading, refreshFolders } = useFolders();

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    refreshFolders();
  }, [refreshFolders]);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleSearch = async () => {
    const trimmed = searchValue.trim();
    if (!trimmed) {
      setSearchResults(null);
      return;
    }

    setSearchLoading(true);
    try {
      const res = await axios.get(`/api/search`, {
        params: { uuid: trimmed },
      });
      setSearchResults(res.data);
    } catch (error) {
      console.error("Search API error:", error);
      setSearchResults([]);
    }
    setSearchLoading(false);
  };

  const handleReset = () => {
    setSearchValue("");
    setSearchResults(null);
    refreshFolders();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const displayedFolders = useMemo(() => {
    if (searchResults !== null) return searchResults;
    return folders;
  }, [folders, searchResults]);

  return (
    <Box className={classes.mainWrapper}>
      <Typography variant="h5" gutterBottom>
        {t("searchTitle")}
      </Typography>
      <Box className={classes.searchContainer}>
        <TextField
          label={t("searchFieldLabel")}
          variant="outlined"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyPress}
          className={classes.searchInput}
        />
        <Button variant="contained" onClick={handleSearch}>
          {t("searchFieldButton")}
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          {t("searchFieldReset")}
        </Button>
      </Box>
      {loading || searchLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 7 }}>
          <CircularProgress />
        </Box>
      ) : displayedFolders.length > 0 ? (
        <Grid container spacing={3}>
          {displayedFolders.map((folder) => (
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
                  <Tooltip title={t("copyIdTooltip")}>
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
          {t("searchEmptyData")}
        </Typography>
      )}
    </Box>
  );
};

export default SearchPage;
