import { Button, ButtonGroup } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function TableButtons({ setOpenNewModal }) {
  return (
    <ButtonGroup
      aria-label="table button group"
      color="warning"
      variant="outlined"
      size="small"
      sx={{ m: 2 }}
    >
      <Button onClick={() => setOpenNewModal(true)}>
        <AddCircleOutlineIcon />
      </Button>
      <Button>
        <EditIcon />
      </Button>
      <Button>
        <HighlightOffIcon />
      </Button>
    </ButtonGroup>
  );
}

export default TableButtons;
