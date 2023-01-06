import styled from "@emotion/styled";
import { Chip, Typography } from "@mui/material";

const TitleBox = styled(Chip)(() => ({
  boxShadow: "1px 1px 5px dimgray",
  borderRadius: "5px",
}));

function PageTitle({ title }) {
  return (
    <TitleBox
      variant="contained"
      color="warning"
      label={<Typography variant="body1">{title}</Typography>}
    />
  );
}

export default PageTitle;
