import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  Checkbox,
  Modal,
  Tooltip,
  IconButton,
  Skeleton,
} from "@mui/material";
import ImageOverlay from "../../components/imageOverlay";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";
import { useFolders } from "../../context/foldersContext";
import PrintButton from "../../components/printButton";
import useStyles from "./styles";

const FolderPage = () => {
  const classes = useStyles();
  const { folderId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { folders } = useFolders();

  const folder = folders.find((f) => f.folderId === folderId);

  const [selectedImages, setSelectedImages] = useState([]);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoaded = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleImageClickForOverlay = (imageObj) => {
    const index = folder.images.findIndex((img) => img.id === imageObj.id);
    setSelectedImageIndex(index);
  };

  const handleCloseOverlay = () => {
    setSelectedImageIndex(null);
  };

  const handleSelect = (imageObject) => {
    setSelectedImages((prevSelected) => {
      const isSelected = prevSelected.find((img) => img.id === imageObject.id);
      if (isSelected) {
        return prevSelected.filter((img) => img.id !== imageObject.id);
      } else {
        return [...prevSelected, imageObject];
      }
    });
  };

  if (!folder) return <Typography>{t("folderNotFound")}</Typography>;

  return (
    <Box className={classes.mainWrapper}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h6">{folder.folderId}</Typography>
        <Tooltip title={t("copyIdTooltip")}>
          <IconButton size="small" onClick={() => handleCopy(folder.folderId)}>
            <ContentCopyIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box className={classes.buttonsWrapper}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          {t("folderBackButton")}
        </Button>
        <Button
          variant="contained"
          onClick={() => setPrintModalOpen(true)}
          disabled={selectedImages.length === 0}
        >
          {t("folderPrintButton")}
        </Button>
      </Box>
      <Box className={classes.gridWrapper}>
        <Grid container spacing={2}>
          {folder.images.map((imageObj) => {
            const fullPath = `/photos/${folder.folderId}/${imageObj.filename}`;
            const isChecked = selectedImages.some(
              (selImg) => selImg.id === imageObj.id
            );
            const isLoaded = loadedImages[imageObj.id];

            return (
              <Grid key={imageObj.id}>
                <Box
                  className={classes.imageBox}
                  style={{ position: "relative" }}
                >
                  <Checkbox
                    checked={isChecked}
                    onChange={() => handleSelect(imageObj)}
                    className={classes.checkbox}
                    style={{
                      position: "absolute",
                      top: 5,
                      left: 5,
                      zIndex: 10,
                    }}
                  />
                  {!isLoaded && (
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: 350,
                        height: "auto",
                        aspectRatio: "3/2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f0f0f0",
                        margin: "8px",
                        borderRadius: 1,
                      }}
                    />
                  )}
                  <img
                    key={imageObj.id}
                    src={fullPath}
                    alt={imageObj.filename}
                    onClick={() => handleImageClickForOverlay(imageObj)}
                    onLoad={() => handleImageLoaded(imageObj.id)}
                    style={{
                      cursor: "pointer",
                      width: "100%",
                      maxWidth: 350,
                      height: "auto",
                      margin: 8,
                      outline: isChecked && "3px solid #1976d2",
                      borderRadius: 4,
                      display: isLoaded ? "block" : "none",
                    }}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Modal open={printModalOpen} onClose={() => setPrintModalOpen(false)}>
        <Box className={classes.modal}>
          <Box className={classes.buttonsWrapper}>
            <Typography variant="h6">
              {t("printModalSelected")} {selectedImages.length}
            </Typography>
            <PrintButton
              selectedImages={selectedImages}
              folderId={folder.folderId}
            />
          </Box>
          {selectedImages.length === 0 ? (
            <Typography>{t("printModalEmpty")}</Typography>
          ) : (
            <Grid container spacing={2} className={classes.previewGrid}>
              {selectedImages.map((selectedImgObj) => (
                <Grid key={selectedImgObj.id}>
                  <img
                    src={`/photos/${folder.folderId}/${selectedImgObj.filename}`}
                    alt={selectedImgObj.filename}
                    className={classes.previewImage}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Modal>
      <ImageOverlay
        open={selectedImageIndex !== null}
        imageObj={folder.images[selectedImageIndex]}
        onClose={handleCloseOverlay}
        onToggleSelect={handleSelect}
        isSelected={
          selectedImageIndex !== null &&
          selectedImages.some(
            (img) => img.id === folder.images[selectedImageIndex].id
          )
        }
        goNext={() =>
          setSelectedImageIndex((prev) =>
            Math.min(prev + 1, folder.images.length - 1)
          )
        }
        goPrev={() => setSelectedImageIndex((prev) => Math.max(prev - 1, 0))}
        hasNext={selectedImageIndex < folder.images.length - 1}
        hasPrev={selectedImageIndex > 0}
        folder={folder}
      />
    </Box>
  );
};

export default FolderPage;
