import { Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import DataTable from "../../components/DataTable";
import Loading from "../../components/Loading";
import PageTitle from "../../components/PageTitle";
import PaginationBox from "../../components/PaginationBox";
import TableButtons from "../../components/TableButtons";
import useSnack from "../../hooks/useSnacks";
import { selectAllCustomers } from "../customers/customersSlice";
import { selectAllSellers } from "../sellers/sellersSlice";
import DeleteInvoicesModal from "./DeleteInvoicesModal";
import EditInvoiceModal from "./EditInvoiceModal";
import {
  deleteInvoice,
  selectInvoicesError,
  selectInvoicesLoading,
  selectSortedInvoices,
} from "./invoicesSlice";
import NewInvoiceModal from "./NewInvoiceModal";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function Invoices() {
  const invoices = useSelector(selectSortedInvoices);
  const loading = useSelector(selectInvoicesLoading);
  const error = useSelector(selectInvoicesError);
  const customers = useSelector(selectAllCustomers);
  const sellers = useSelector(selectAllSellers);
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

  const columns = useMemo(
    () => [
      {
        category: "invoices",
        name: "seller",
        display: "Seller",
        format: (value) => {
          const sellerId = sellers?.find((s) => value === s.companyName).id;
          return (
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/sellers/${sellerId}`}
            >
              {value}
            </Link>
          );
        },
      },
      {
        category: "invoices",
        name: "customer",
        display: "Customer",
        format: (value) => {
          const customerId = customers?.find(
            (s) => value === `${s.name} ${s.surname}`
          ).id;
          return (
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/customers/${customerId}`}
            >
              {value}
            </Link>
          );
        },
      },
      {
        category: "invoices",
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
        category: "invoices",
        name: "amount",
        display: "Amount",
        format: (value) => formatter.format(value),
      },
    ],
    [sellers, customers]
  );

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

  if (loading || !sellers || !customers) {
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
