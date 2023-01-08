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
import DeleteSellersModal from "./DeleteSellersModal";
import EditSellerModal from "./EditSellerModal";
import NewSellerModal from "./NewSellerModal";
import {
  deleteSeller,
  selectAllSellers,
  selectSellersError,
  selectSellersLoading,
} from "./sellersSlice";

function Sellers() {
  const sellers = useSelector(selectAllSellers);
  const loading = useSelector(selectSellersLoading);
  const error = useSelector(selectSellersError);
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
  const usedSellers = useMemo(
    () => [...new Set(invoices.map((i) => i.sellerId))],
    [invoices]
  );

  const columns = [
    {
      name: "companyName",
      display: "Company name",
    },
    {
      name: "hqAddress",
      display: "HQ address",
    },
    {
      name: "id",
      display: "ID",
    },
    {
      name: "isActive",
      display: "Active",
      format: (value) => value.toString(),
    },
  ];

  useEffect(() => {
    if (id) {
      setSelected([Number(id)]);
      setOpenEditModal(true);
    }
  }, []);

  useEffect(() => {
    setTableItems(sellers.slice(offset * pages, (offset + 1) * pages));
  }, [offset, pages, sellers]);

  function handleRemove() {
    const filteredSelected = selected.filter((s) => !usedSellers.includes(s));

    if (!filteredSelected.length) {
      return activateSnack(
        "error",
        "Action aborted, there are invoices related to slected seller(s)"
      );
    }

    try {
      dispatch(deleteSeller(filteredSelected));
      if (filteredSelected.length !== selected.length) {
        activateSnack(
          "warning",
          "Action partially aborted, there are invoices related to slected seller(s)"
        );
      } else {
        activateSnack("success", "Seller deleted");
      }
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
      <PageTitle title="Sellers" />
      <TableButtons
        setOpenNewModal={setOpenNewModal}
        setOpenEditModal={setOpenEditModal}
        setOpenDeleteModal={setOpenDeleteModal}
        selected={selected}
        path="/sellers"
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
        length={sellers.length}
      />
      <NewSellerModal open={openNewModal} setOpen={setOpenNewModal} />
      <EditSellerModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        path="/sellers"
      />
      <DeleteSellersModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleRemove={handleRemove}
      />
    </Stack>
  );
}

export default Sellers;
