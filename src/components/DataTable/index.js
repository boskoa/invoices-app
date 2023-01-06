import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function DataTable({ rows, columns }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((c) => (
              <TableCell key={c.name} align="center">
                {c.display}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id || Math.floor(Math.random() * 1000000)}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((c) => {
                console.log("TABELAFOOOO", row, c, row[c.name]);
                return (
                  <TableCell key={c.name} align="center">
                    {c.format ? c.format(row[c.name]) : row[c.name]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
