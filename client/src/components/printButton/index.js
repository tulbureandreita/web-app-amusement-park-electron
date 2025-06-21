import React, { useState } from "react";
import { printImagesWithCuts } from "../../utils/epsonPrint";
import { Button, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

const PrintButton = ({ selectedImages, folderId }) => {
  const { t } = useTranslation();
  const baseUrl = "/photos";

  const [isPrinting, setIsPrinting] = useState(false);

  const imageUrls = selectedImages.map(
    (img) => `${baseUrl}/${folderId}/${img.filename}`
  );

  const handlePrint = async () => {
    if (isPrinting || selectedImages.length === 0) return;

    setIsPrinting(true);

    try {
      await printImagesWithCuts(imageUrls);
      alert("Printed successfully!");
    } catch (err) {
      console.error(err);
      alert(`Print failed: ${err}`);
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handlePrint}
      disabled={isPrinting || selectedImages.length === 0}
      startIcon={
        isPrinting ? <CircularProgress size={20} color="inherit" /> : null
      }
    >
      {isPrinting ? t("printModalButtonLoading") : t("printModalButton")}
    </Button>
  );
};

export default PrintButton;
