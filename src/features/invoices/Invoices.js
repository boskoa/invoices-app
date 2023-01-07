import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DataTable from "../../components/DataTable";
import PageTitle from "../../components/PageTitle";
import TableButtons from "../../components/TableButtons";
import EditInvoiceModal from "./EditInvoiceModal";
import {
  deleteInvoice,
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
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  console.log("USE PARAMS", id);

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

  useEffect(() => {
    if (id) {
      setSelected(Number(id));
    }
  }, [id]);

  function handleRemove() {
    try {
      dispatch(deleteInvoice(selected));
    } catch (error) {
      console.log(error.message);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return console.log("INVOICES ERROR", error);
  }

  return (
    <Stack alignItems="center">
      <PageTitle title="Invoices" />
      <TableButtons
        setOpenNewModal={setOpenNewModal}
        setOpenEditModal={setOpenEditModal}
        selected={selected}
        path="/invoices"
        handleRemove={handleRemove}
      />
      <DataTable
        columns={columns}
        rows={invoices}
        selected={selected}
        setSelected={setSelected}
      />
      <NewInvoiceModal open={openNewModal} setOpen={setOpenNewModal} />
      <EditInvoiceModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        path="/invoices"
      />
    </Stack>
  );
}

export default Invoices;
