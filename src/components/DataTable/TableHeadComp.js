import { TableHead, TableRow } from "@mui/material";
import HeaderCell from "./HeaderCell";

function TableHeadComp({ columns }) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((c) => (
          <HeaderCell key={c.name} c={c} align="center" />
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeadComp;
