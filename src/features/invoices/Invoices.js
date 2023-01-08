import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DataTable from "../../components/DataTable";
import Loading from "../../components/Loading";
import PageTitle from "../../components/PageTitle";
import PaginationBox from "../../components/PaginationBox";
import TableButtons from "../../components/TableButtons";
import useSnack from "../../hooks/useSnacks";
import DeleteInvoicesModal from "./DeleteInvoicesModal";
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
  const [pages, setPages] = useState(10);
  const [offset, setOffset] = useState(0);
  const [tableItems, setTableItems] = useState([]);
  const [openNewModal, setOpenNewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const activateSnack = useSnack();

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
      setSelected([Number(id)]);
      setOpenEditModal(true);
    }
  }, []);

  useEffect(() => {
    setTableItems(invoices.slice(offset * pages, (offset + 1) * pages));
  }, [offset, pages, invoices]);

  function handleRemove() {
    try {
      dispatch(deleteInvoice(selected));
      activateSnack("success", "Invoice deleted");
      setSelected([]);
    } catch (error) {
      activateSnack("error", error.message);
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return activateSnack("error", error);
  }

  return (
    <Stack alignItems="center">
      <PageTitle title="Invoices" />
      <TableButtons
        setOpenNewModal={setOpenNewModal}
        setOpenEditModal={setOpenEditModal}
        setOpenDeleteModal={setOpenDeleteModal}
        selected={selected}
        path="/invoices"
      />
      <DataTable
        columns={columns}
        rows={tableItems}
        selected={selected}
        setSelected={setSelected}
      />
      <PaginationBox
        pages={pages}
        setPages={setPages}
        offset={offset}
        setOffset={setOffset}
        length={invoices.length}
      />
      <NewInvoiceModal open={openNewModal} setOpen={setOpenNewModal} />
      <EditInvoiceModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        path="/invoices"
      />
      <DeleteInvoicesModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleRemove={handleRemove}
      />
    </Stack>
  );
}

export default Invoices;
