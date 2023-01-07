import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect } from "react";

function DataTable({ rows, columns, selected, setSelected }) {
  useEffect(() => {
    console.log("SELECTED", selected);
  }, [selected]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((c) => (
              <TableCell key={c.name} align="center">
                <strong>{c.display}</strong>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id || Math.floor(Math.random() * 1000000)}
              value={row.id}
              onClick={() => {
                if (selected === row.id) {
                  setSelected(null);
                } else {
                  setSelected(row.id);
                }
              }}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: selected === row.id && "info.light",
              }}
            >
              {columns.map((c) => {
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
