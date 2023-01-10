import { Table, TableBody, TableContainer, Paper } from "@mui/material";
import TableHeadComp from "./TableHeadComp";
import TableRowComp from "./TableRowComp";

function DataTable({ rows, columns, selected, setSelected }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHeadComp columns={columns} />
        <TableBody>
          {rows.map((row) => (
            <TableRowComp
              key={row.id || Math.floor(Math.random() * 1000000)}
              row={row}
              columns={columns}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
