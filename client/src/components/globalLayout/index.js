import React from "react";
import { useTranslation } from "react-i18next";
import { Select, MenuItem, Box } from "@mui/material";
import Flag from "react-world-flags";

function GlobalLayout({ children }) {
  const { i18n } = useTranslation();

  return (
    <Box position="relative" height={"100%"}>
      <Select
        value={i18n.language || "en"}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        size="small"
        sx={{
          position: "fixed",
          top: { xs: 8, sm: 12 },
          right: 16,
          zIndex: 1300,
          backgroundColor: "rgba(256, 256, 256, 0.5)",
          borderRadius: 1,
        }}
        autoWidth
      >
        <MenuItem value="bg">
          <Flag code="BG" style={{ width: 17, marginRight: 7, height: 12 }} />
          BG
        </MenuItem>
        <MenuItem value="en">
          <Flag code="GB" style={{ width: 17, marginRight: 7, height: 12 }} />
          EN
        </MenuItem>
        <MenuItem value="ro">
          <Flag code="RO" style={{ width: 17, marginRight: 7, height: 12 }} />
          RO
        </MenuItem>
        <MenuItem value="de">
          <Flag code="DE" style={{ width: 17, marginRight: 7, height: 12 }} />
          DE
        </MenuItem>
      </Select>
      {children}
    </Box>
  );
}

export default GlobalLayout;
