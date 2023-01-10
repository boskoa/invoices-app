import { Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DataTable from "../../components/DataTable";
import Loading from "../../components/Loading";
import PageTitle from "../../components/PageTitle";
import PaginationBox from "../../components/PaginationBox";
import TableButtons from "../../components/TableButtons";
import useSnack from "../../hooks/useSnacks";
import { selectAllInvoices } from "../invoices/invoicesSlice";
import { changeSorter } from "../settings/settingsSlice";
import {
  deleteCustomer,
  selectCustomersError,
  selectCustomersLoading,
  selectSortedCustomers,
} from "./customersSlice";
import DeleteCustomersModal from "./DeleteCustomersModal";
import EditCustomerModal from "./EditCustomerModal";
import NewCustomerModal from "./NewCustomerModal";

function Customers() {
  const customers = useSelector(selectSortedCustomers);
  const loading = useSelector(selectCustomersLoading);
  const error = useSelector(selectCustomersError);
  const invoices = useSelector(selectAllInvoices);
  const { id } = useParams();
  const [selected, setSelected] = useState([]);
  const [openNewModal, setOpenNewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [pages, setPages] = useState(10);
  const [offset, setOffset] = useState(0);
  const [tableItems, setTableItems] = useState([]);
  const dispatch = useDispatch();
  const activateSnack = useSnack();
  const usedCustomers = useMemo(
    () => [...new Set(invoices.map((i) => i.customerId))],
    [invoices]
  );

  const columns = useMemo(
    () => [
      {
        category: "customers",
        name: "name",
        display: "Name",
        minWidth: 130,
        align: "left",
      },
      {
        category: "customers",
        name: "surname",
        display: "Surname",
        minWidth: 140,
        align: "left",
      },
      {
        category: "customers",
        name: "age",
        display: "Age",
        minWidth: 100,
        align: "center",
      },
      {
        category: "customers",
        name: "id",
        display: "ID",
        minWidth: 90,
        align: "center",
      },
      {
        category: "customers",
        name: "address",
        display: "Address",
        minWidth: 170,
        align: "left",
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(changeSorter("name"));
    if (id) {
      setSelected([Number(id)]);
      setOpenEditModal(true);
    }
  }, []);

  useEffect(() => {
    setTableItems(customers.slice(offset * pages, (offset + 1) * pages));
  }, [offset, pages, customers]);

  function handleRemove() {
    const filteredSelected = selected.filter((s) => !usedCustomers.includes(s));

    if (!filteredSelected.length) {
      return activateSnack(
        "error",
        "Action aborted, there are invoices related to slected customer(s)"
      );
    }

    try {
      dispatch(deleteCustomer(filteredSelected));
      if (filteredSelected.length !== selected.length) {
        activateSnack(
          "warning",
          "Action partially aborted, there are invoices related to slected customer(s)"
        );
      } else {
        activateSnack("success", "Customer deleted");
      }
      setSelected([]);
    } catch (error) {
      activateSnack("error", error.message);
    }
  }

  if (loading || !customers) {
    return <Loading />;
  }

  if (error) {
    return activateSnack("error", error);
  }

  return (
    <Stack alignItems="center">
      <PageTitle title="Customers" />
      <TableButtons
        setOpenNewModal={setOpenNewModal}
        setOpenEditModal={setOpenEditModal}
        setOpenDeleteModal={setOpenDeleteModal}
        selected={selected}
        path="/customers"
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
        length={customers.length}
      />
      <NewCustomerModal open={openNewModal} setOpen={setOpenNewModal} />
      <EditCustomerModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        path="/customers"
      />
      <DeleteCustomersModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleRemove={handleRemove}
      />
    </Stack>
  );
}

export default Customers;
