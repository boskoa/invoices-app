import { Modal, Stack } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  justifyContent: "space-between",
};

function ModalTemplate({ children, open }) {
  return (
    <Modal open={open}>
      <Stack spacing={2} sx={style}>
        {children}
      </Stack>
    </Modal>
  );
}

export default ModalTemplate;
