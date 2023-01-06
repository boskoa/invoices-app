import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataTable from "../../components/DataTable";
import PageTitle from "../../components/PageTitle";
import TableButtons from "../../components/TableButtons";
import {
  selectAllInvoices,
  selectInvoicesError,
  selectInvoicesLoading,
} from "./invoicesSlice";
import NewInvoiceModal from "./NewInvoiceModal";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function Invoices() {
  const invoices = useSelector(selectAllInvoices);
  const loading = useSelector(selectInvoicesLoading);
  const error = useSelector(selectInvoicesError);
  const [openNewModal, setOpenNewModal] = useState(false);

  useEffect(() => {
    console.log("INVOICES", invoices);
  }, [invoices]);

  const columns = [
    {
      name: "seller",
      display: "Seller",
    },
    {
      name: "customer",
      display: "Customer",
    },
    {
      name: "date",
      display: "Date",
      format: (value) => {
        const date = new Date(value);
        return `${date.getUTCDate()}.${
          date.getUTCMonth() + 1
        }.${date.getUTCFullYear()}`;
      },
    },
    {
      name: "amount",
      display: "Amount",
      format: (value) => formatter.format(value),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return console.log("INVOICES ERROR", error);
  }

  return (
    <Stack alignItems="center">
      <PageTitle title="Invoices" />
      <TableButtons setOpenNewModal={setOpenNewModal} />
      <DataTable columns={columns} rows={invoices} />
      <NewInvoiceModal open={openNewModal} setOpen={setOpenNewModal} />
    </Stack>
  );
}

export default Invoices;
