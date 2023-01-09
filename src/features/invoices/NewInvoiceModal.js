import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalTemplate from "../../components/ModalTemplate";
import useSnack from "../../hooks/useSnacks";
import { amountValidator, dateValidator } from "../../utils/validators";
import { selectAllCustomers } from "../customers/customersSlice";
import { selectAllSellers } from "../sellers/sellersSlice";
import { postNewInvoice, selectInvoiceIds } from "./invoicesSlice";

function NewInvoiceModal({ open, setOpen }) {
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [dateError, setDateError] = useState("");
  const [seller, setSeller] = useState("");
  const [sellerError, setSellerError] = useState("");
  const [customer, setCustomer] = useState("");
  const [customerError, setCustomerError] = useState("");
  const sellers = useSelector(selectAllSellers).filter((s) => s.isActive);
  const customers = useSelector(selectAllCustomers);
  const id = Math.max(useSelector(selectInvoiceIds)) + 1;
  const activateSnack = useSnack();
  const dispatch = useDispatch();

  function handleAmount(e) {
    let checkedValue = amountValidator(e.target.value);
    if (isNaN(checkedValue)) {
      setAmountError(checkedValue);
    } else {
      setAmountError("");
      setAmount(Number(checkedValue));
    }
  }

  function handleNewInvoice() {
    const date = dateValidator(dateInput);

    if (
      typeof seller !== "number" ||
      typeof customer !== "number" ||
      typeof date !== "object" ||
      typeof amount !== "number"
    ) {
      if (typeof seller !== "number") {
        setSellerError("Seller must be set");
      }
      if (typeof customer !== "number") {
        setCustomerError("Customer must be set");
      }
      if (typeof date !== "object") {
        setDateError(date);
      }
      if (typeof amount !== "number") {
        setAmountError("Amount must be set");
      }
    } else {
      dispatch(
        postNewInvoice({
          id,
          date: date.toString(),
          amount,
          customerId: Number(customer),
          sellerId: Number(seller),
          customer: customers.find((c) => c.id === customer),
          seller: sellers.find((s) => s.id === seller),
        })
      );
      activateSnack("success", "Invoice created");
      setOpen(false);
      setAmount("");
      setSeller("");
      setCustomer("");
      setDateInput("");
    }
    return;
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
          error={Boolean(sellerError)}
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
        <FormHelperText>{sellerError}</FormHelperText>
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
          error={Boolean(customerError)}
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
        <FormHelperText>{customerError}</FormHelperText>
      </FormControl>
      <Button
        size="small"
        variant="contained"
        color="success"
        onClick={handleNewInvoice}
      >
        Create
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
          setCustomerError("");
          setSellerError("");
        }}
      >
        Close
      </Button>
    </ModalTemplate>
  );
}

export default NewInvoiceModal;
