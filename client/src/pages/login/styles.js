import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    boxSizing: "border-box",
  },
  paper: {
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "400px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
  },
  title: {
    marginBottom: "16px",
  },
  form: {
    width: "100%",
    marginTop: "10px",
  },
  field: {
    borderRadius: "10px",
  },
  submit: {
    marginTop: "24px",
    marginBottom: "8px",
    borderRadius: "7px",
    height: "40px",
  },
});

export default useStyles;
