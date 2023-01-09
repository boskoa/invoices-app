/* eslint-disable indent */
import { IconButton, TableCell } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeInvoicesSort } from "../../features/invoices/invoicesSlice";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { changeSellersSort } from "../../features/sellers/sellersSlice";
import { changeCustomersSort } from "../../features/customers/customersSlice";

function HeaderCell({ c }) {
  const [order, setOrder] = useState("desc");
  const dispatch = useDispatch();

  function handleSort() {
    switch (c.category) {
      case "invoices":
        dispatch(changeInvoicesSort([c.name, order]));
        break;
      case "sellers":
        dispatch(changeSellersSort([c.name, order]));
        break;
      case "customers":
        dispatch(changeCustomersSort([c.name, order]));
        break;
      default:
        break;
    }
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }

  return (
    <TableCell key={c.name} align="center" onClick={handleSort}>
      <strong style={{ cursor: "pointer" }}>
        {c.display}
        <IconButton size="small">
          {order === "asc" ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </IconButton>
      </strong>
    </TableCell>
  );
}

export default HeaderCell;
