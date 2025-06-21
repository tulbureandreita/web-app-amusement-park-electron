import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: "14px 14px 0px 14px",
    boxSizing: "border-box",
  },
  buttonsWrapper: {
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  gridWrapper: {
    flexGrow: 1,
    height: "80%",
    overflowY: "auto",
    marginTop: 8,
  },
  imageBox: {
    position: "relative",
    display: "inline-block",
  },
  checkbox: {
    position: "absolute !important",
    top: 5,
    left: 5,
    background: "#fff",
    borderRadius: 4,
    "&:hover": {
      backgroundColor: "#fff",
      boxShadow: "none",
    },
  },
  image: {
    width: 150,
    height: 150,
    objectFit: "cover",
    borderRadius: 8,
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    padding: 20,
    maxHeight: "80vh",
    overflowY: "auto",
    borderRadius: 8,
    minWidth: 350,
    width: "auto",
  },
  previewGrid: {
    marginTop: 10,
  },
  previewImage: {
    width: 200,
    objectFit: "cover",
    borderRadius: 6,
  },
});
export default useStyles;
