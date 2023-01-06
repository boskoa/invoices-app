import styled from "@emotion/styled";
import { Stack, Typography } from "@mui/material";

const Heading = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.warning.main}`,
  borderRadius: "3px",
  width: "100%",
}));

function TableHeading({ heads }) {
  return (
    <Heading direction="row" justifyContent="space-evenly">
      {heads.map((h, i) => (
        <Typography variant="body2" key={i}>
          {h}
        </Typography>
      ))}
    </Heading>
  );
}

export default TableHeading;
