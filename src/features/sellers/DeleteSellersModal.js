import { Button, Stack, Typography } from "@mui/material";
import ModalTemplate from "../../components/ModalTemplate";

function DeleteSellersModal({ open, setOpen, handleRemove }) {
  return (
    <ModalTemplate open={open} setOpen={setOpen}>
      <Typography align="center">Are you sure?</Typography>
      <Stack direction="row" justifyContent="space-evenly" alignItems="center">
        <Button
          size="small"
          variant="contained"
          color="warning"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          color="success"
          onClick={() => {
            handleRemove();
            setOpen(false);
          }}
        >
          Delete
        </Button>
      </Stack>
    </ModalTemplate>
  );
}

export default DeleteSellersModal;
