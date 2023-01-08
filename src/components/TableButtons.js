import { Button, ButtonGroup } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useNavigate } from "react-router-dom";

function TableButtons({
  setOpenNewModal,
  setOpenEditModal,
  selected,
  path,
  handleRemove,
}) {
  const navigate = useNavigate();

  return (
    <ButtonGroup
      aria-label="table button group"
      color="success"
      variant="outlined"
      size="small"
      sx={{ m: 2 }}
    >
      <Button onClick={() => setOpenNewModal(true)}>
        <AddCircleOutlineIcon />
      </Button>
      <Button
        disabled={selected === null}
        onClick={() => {
          navigate(`${path}/${selected}`);
          setOpenEditModal(true);
        }}
      >
        <EditIcon />
      </Button>
      <Button disabled={selected === null} onClick={handleRemove}>
        <HighlightOffIcon />
      </Button>
    </ButtonGroup>
  );
}

export default TableButtons;
