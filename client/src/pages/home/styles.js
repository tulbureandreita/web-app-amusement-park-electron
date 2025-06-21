import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  mainWrapper: {
    padding: 14,
  },
  folderCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    border: "1px solid #ddd",
    borderRadius: 12,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    width: "fit-content",
  },
  folderIconButton: {
    marginBottom: 8,
  },
  folderIcon: {
    fontSize: 60,
    color: "#1976d2",
  },
  folderFooter: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    marginTop: 4,
  },
});

export default useStyles;
