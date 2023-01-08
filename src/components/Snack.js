import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import MuiAlertTitle from "@mui/material/AlertTitle";
import { useDispatch, useSelector } from "react-redux";
import { removeSnack, selectSnacks } from "../features/snacks/snacksSlice";

function Snack() {
  const dispatch = useDispatch();
  const snackValues = useSelector(selectSnacks);

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      dispatch(removeSnack());
    }
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={snackValues.open}
      onClose={handleSnackClose}
    >
      <MuiAlert
        variant="filled"
        severity={snackValues.severity}
        sx={{ width: "100%" }}
      >
        {snackValues.authority && (
          <MuiAlertTitle>
            {snackValues.authority} - {snackValues.procedure}
          </MuiAlertTitle>
        )}
        {snackValues.message}
      </MuiAlert>
    </Snackbar>
  );
}

export default Snack;
