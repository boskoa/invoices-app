import styled from "@emotion/styled";
import { Paper, Stack, Typography } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "200px",
  margin: "1rem",
  padding: "1em",
  backgroundColor: theme.palette.warning.contrastText,
}));

function HomePage() {
  return (
    <Stack
      direction={{ sm: "row" }}
      justifyContent="center"
      alignItems="center"
    >
      <StyledPaper elevation={3}>
        <Typography variant="h6">Invoices</Typography>
        <Typography variant="body2">
          See all invoices, create new ones, edit or delete existing ones.
        </Typography>
      </StyledPaper>
      <StyledPaper elevation={3}>
        <Typography variant="h6">Sellers</Typography>
        <Typography variant="body2">
          See all sellers, create new ones, edit or delete existing ones.
        </Typography>
      </StyledPaper>
      <StyledPaper elevation={3}>
        <Typography variant="h6">Customers</Typography>
        <Typography variant="body2">
          See all customers, create new ones, edit or delete existing ones.
        </Typography>
      </StyledPaper>
    </Stack>
  );
}

export default HomePage;
