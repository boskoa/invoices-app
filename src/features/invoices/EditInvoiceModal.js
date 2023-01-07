import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ModalTemplate from "../../components/ModalTemplate";
import { amountValidator, dateValidator } from "../../utils/validators";
import { selectAllCustomers } from "../customers/customersSlice";
import { selectAllSellers } from "../sellers/sellersSlice";
import { editInvoice, selectInvoiceById } from "./invoicesSlice";

function EditInvoiceModal({ open, setOpen, path }) {
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [dateError, setDateError] = useState("");
  const [seller, setSeller] = useState("");
  const [customer, setCustomer] = useState("");
  const sellers = useSelector(selectAllSellers);
  const customers = useSelector(selectAllCustomers);
  const { id } = useParams();
  const selectedInvoice = useSelector((state) => selectInvoiceById(state, id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function dateToString(d) {
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    if (selectedInvoice) {
      setAmount(selectedInvoice.amount);
      setSeller(selectedInvoice.sellerId);
      setCustomer(selectedInvoice.customerId);
      setDateInput(dateToString(new Date(selectedInvoice.date)));
      setAmountError("");
      setDateError("");
    }
  }, [selectedInvoice]);

  function handleAmount(e) {
    let checkedValue = amountValidator(e.target.value);
    if (isNaN(checkedValue)) {
      setAmountError(checkedValue);
    } else {
      setAmountError("");
      setAmount(Number(checkedValue));
    }
  }

  function handleEdit() {
    const date = dateValidator(dateInput);
    if (typeof date !== "object" || typeof amount !== "number") {
      if (typeof date !== "object") {
        setDateError(date);
      }
      if (typeof amount !== "number") {
        setAmountError("Amount must be set");
      }
    } else {
      try {
        dispatch(
          editInvoice({
            id,
            updates: {
              amount,
              date: date.toString(),
              customerId: Number(customer),
              sellerId: Number(seller),
              customer: customers.find((c) => c.id === customer),
              seller: sellers.find((s) => s.id === seller),
            },
          })
        );
        setOpen(false);
        setAmount("");
        setSeller("");
        setCustomer("");
        navigate(path);
      } catch (error) {
        console.log("ERROR", error);
      }
    }
  }

  return (
    <ModalTemplate open={open} setOpen={setOpen}>
      <TextField
        size="small"
        label={
          <Typography sx={{ mt: "3px" }} variant="subtitle2">
            Enter amount
          </Typography>
        }
        error={Boolean(amountError)}
        type="text"
        value={amount}
        onChange={handleAmount}
        helperText={amountError}
      />
      <TextField
        size="small"
        label={
          <Typography sx={{ mt: "3px" }} variant="subtitle2">
            Enter date (or leave empty for today)
          </Typography>
        }
        error={Boolean(dateError)}
        type="text"
        value={dateInput}
        onChange={(e) => setDateInput(e.target.value)}
        placeholder="dd/mm/yyyy"
        helperText={dateError}
      />
      <FormControl>
        <InputLabel id="seller-label">
          <Typography sx={{ lineHeight: "100%" }} variant="subtitle2">
            Choose seller
          </Typography>
        </InputLabel>
        <Select
          size="small"
          labelId="seller-label"
          id="seller"
          value={seller}
          label="Choose seller"
          onChange={(e) => setSeller(e.target.value)}
        >
          {sellers.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.companyName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="customer-label">
          <Typography sx={{ lineHeight: "100%" }} variant="subtitle2">
            Choose customer
          </Typography>
        </InputLabel>
        <Select
          size="small"
          labelId="customer-label"
          id="customer"
          value={customer}
          label="Choose customer"
          onChange={(e) => setCustomer(e.target.value)}
        >
          {customers.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {`${c.name} ${c.surname}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        size="small"
        variant="contained"
        color="success"
        onClick={handleEdit}
      >
        Edit
      </Button>
      <Button
        size="small"
        variant="contained"
        color="warning"
        onClick={() => {
          setOpen(false);
          setAmount("");
          setSeller("");
          setCustomer("");
          setDateInput("");
          setAmountError("");
          setDateError("");
          navigate(path);
        }}
      >
        Close
      </Button>
    </ModalTemplate>
  );
}

export default EditInvoiceModal;
