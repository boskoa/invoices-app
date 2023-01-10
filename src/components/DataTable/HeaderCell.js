/* eslint-disable indent */
import { IconButton, Stack, TableCell } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeInvoicesSort } from "../../features/invoices/invoicesSlice";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { changeSellersSort } from "../../features/sellers/sellersSlice";
import { changeCustomersSort } from "../../features/customers/customersSlice";
import {
  changeSorter,
  selectCurrentSorter,
} from "../../features/settings/settingsSlice";

function HeaderCell({ c }) {
  const [order, setOrder] = useState("desc");
  const sorter = useSelector(selectCurrentSorter);
  const dispatch = useDispatch();

  function handleSort() {
    switch (c.category) {
      case "invoices":
        dispatch(changeInvoicesSort([c.name, order]));
        dispatch(changeSorter(c.name));
        break;
      case "sellers":
        dispatch(changeSellersSort([c.name, order]));
        dispatch(changeSorter(c.name));
        break;
      case "customers":
        dispatch(changeCustomersSort([c.name, order]));
        dispatch(changeSorter(c.name));
        break;
      default:
        break;
    }
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }

  return (
    <TableCell
      key={c.name}
      align="center"
      onClick={handleSort}
      sx={{
        pt: 1,
        minWidth: c.minWidth,
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ position: "relative", height: 30 }}
      >
        <strong style={{ cursor: "pointer" }}>{c.display}</strong>
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 13,
            display: sorter !== c.name && "none",
          }}
        >
          {order === "asc" ? (
            <KeyboardArrowUpIcon sx={{ cursor: "pointer" }} />
          ) : (
            <KeyboardArrowDownIcon sx={{ cursor: "pointer" }} />
          )}
        </IconButton>
      </Stack>
    </TableCell>
  );
}

export default HeaderCell;
