import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = () => {
  return (
    <Box sx={{ display: "flex", direction: "row", justifyContent: "center" }}>
      <CircularProgress color="success" />
    </Box>
  );
};

export default Loading;
