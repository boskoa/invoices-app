import { TableCell, TableRow } from "@mui/material";

function TableRowComp({ row, columns, selected, setSelected }) {
  return (
    <TableRow
      value={row.id}
      onClick={() => {
        if (selected.includes(row.id)) {
          setSelected((prev) => prev.filter((i) => i !== row.id));
        } else {
          setSelected((prev) => [...prev, row.id]);
        }
      }}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        backgroundColor: selected.includes(row.id) && "warning.main",
        transition: "background-color 0.7s",
      }}
    >
      {columns.map((c) => {
        return (
          <TableCell key={c.name} align={c.align}>
            {c.format ? c.format(row[c.name]) : row[c.name]}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export default TableRowComp;
