import React from "react";
import { Dialog, DialogContent, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTranslation } from "react-i18next";

const ImageOverlay = ({
  open,
  imageObj,
  onClose,
  onToggleSelect,
  isSelected,
  goNext,
  goPrev,
  hasNext,
  hasPrev,
  folder,
}) => {
  const { t } = useTranslation();
  if (!imageObj) return null;

  const imageUrl = `/photos/${folder.folderId}/${imageObj.filename}`;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="fit-content">
      <div style={{ position: "relative", padding: "10px" }}>
        <Button
          onClick={() => onToggleSelect(imageObj)}
          variant="contained"
          color={isSelected ? "error" : "primary"}
        >
          {isSelected ? t("imageUncheckButton") : t("imageCheckButton")}
        </Button>
        <IconButton
          onClick={onClose}
          style={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}
        >
          <CloseIcon />
        </IconButton>
      </div>
      {hasPrev && (
        <IconButton
          onClick={goPrev}
          style={{
            position: "absolute",
            top: "50%",
            left: 10,
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      )}
      {hasNext && (
        <IconButton
          onClick={goNext}
          style={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      )}
      <DialogContent
        style={{ padding: 0, textAlign: "center", overflow: "hidden" }}
      >
        <img
          src={imageUrl}
          alt="Full Size"
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            width: "auto",
            height: "auto",
            display: "block",
            margin: "0 auto",
            objectFit: "contain",
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImageOverlay;
