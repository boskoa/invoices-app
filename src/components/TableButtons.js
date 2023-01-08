import { Button, ButtonGroup } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useNavigate } from "react-router-dom";

function TableButtons({
  setOpenNewModal,
  setOpenEditModal,
  setOpenDeleteModal,
  selected,
  path,
}) {
  const navigate = useNavigate();
  console.log("EDIT SELECTED", selected);

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
        disabled={selected.length !== 1}
        onClick={() => {
          navigate(`${path}/${selected}`);
          setOpenEditModal(true);
        }}
      >
        <EditIcon />
      </Button>
      <Button
        disabled={selected.length === 0}
        onClick={() => setOpenDeleteModal(true)}
      >
        <HighlightOffIcon />
      </Button>
    </ButtonGroup>
  );
}

export default TableButtons;
