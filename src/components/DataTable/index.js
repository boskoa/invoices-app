import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import TableHeading from "./TableHeading";

const StyledTable = styled(Stack)(() => ({
  width: "100%",
}));

function DataTable({ heads }) {
  return (
    <StyledTable>
      <TableHeading heads={heads || ["name", "id", "age", "address"]} />
      <p>rows</p>
      <p>pagination</p>
    </StyledTable>
  );
}

export default DataTable;
