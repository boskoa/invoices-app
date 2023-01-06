import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalTemplate from "../../components/ModalTemplate";
import { amountValidator } from "../../utils/validators";
import { selectAllCustomers } from "../customers/customersSlice";
import { selectAllSellers } from "../sellers/sellersSlice";
import { postNewInvoice, selectAllInvoices } from "./invoicesSlice";

function NewInvoiceModal({ open, setOpen }) {
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [seller, setSeller] = useState("");
  const [customer, setCustomer] = useState("");
  const sellers = useSelector(selectAllSellers);
  const customers = useSelector(selectAllCustomers);
  const id = useSelector(selectAllInvoices).length;
  const dispatch = useDispatch();
  console.log(customers, sellers);

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
    const date = new Date().toString();
    console.log(
      "NEW INVOICE",
      amount,
      seller.length,
      customer.length,
      date,
      id
    );
    if (amount < 0 || isNaN(seller) || isNaN(customer)) {
      console.log("napraviti notifikaciju za odbijenu fakturu");
    } else {
      dispatch(
        postNewInvoice({
          id,
          date,
          amount,
          customerId: Number(customer),
          sellerId: Number(seller),
          customer: customers.find((c) => c.id === customer),
          seller: sellers.find((s) => s.id === seller),
        })
      );
      setOpen(false);
      setAmount("");
      setSeller("");
      setCustomer("");
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
      <Button size="small" variant="contained" onClick={handleNewInvoice}>
        Create
      </Button>
    </ModalTemplate>
  );
}

export default NewInvoiceModal;
