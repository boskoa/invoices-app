import styled from "@emotion/styled";
import { Chip, Typography } from "@mui/material";

const TitleBox = styled(Chip)(() => ({
  boxShadow: "0px 0px 5px dimgray",
  borderRadius: "5px",
  width: "150px",
  position: "sticky",
  top: 10,
}));

function PageTitle({ title }) {
  return (
    <TitleBox
      variant="contained"
      color="success"
      label={<Typography variant="body1">{title}</Typography>}
    />
  );
}

export default PageTitle;
