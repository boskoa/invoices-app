import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalTemplate from "../../components/ModalTemplate";
import useSnack from "../../hooks/useSnacks";
import { selectCustomerIds } from "../customers/customersSlice";
import { postNewSeller } from "./sellersSlice";

function NewSellerModal({ open, setOpen }) {
  const [companyName, setCompanyName] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [hqAddress, setHqAddress] = useState("");
  const [hqAddressError, setHqAddressError] = useState("");
  const [isActive, setIsActive] = useState(true);
  const id = Math.max(useSelector(selectCustomerIds)) + 1;
  const activateSnack = useSnack();
  const dispatch = useDispatch();

  function handleNewSeller() {
    if (!companyName.length || !hqAddress.length) {
      if (!companyName.length) {
        setCompanyNameError("Company name is mandatory");
      }
      if (!hqAddress.length) {
        setHqAddressError("Address is mandatory");
      }
    } else {
      try {
        dispatch(
          postNewSeller({
            id,
            companyName,
            isActive,
            hqAddress,
          })
        );
        activateSnack("success", "Seller created");
        setOpen(false);
        setCompanyName("");
        setIsActive(true);
        setHqAddress("");
      } catch (error) {
        activateSnack("error", error.message);
      }
    }
    return;
  }

  return (
    <ModalTemplate open={open} setOpen={setOpen}>
      <TextField
        size="small"
        label={
          <Typography sx={{ mt: "3px" }} variant="subtitle2">
            Enter company name
          </Typography>
        }
        error={Boolean(companyNameError)}
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        helperText={companyNameError}
      />
      <TextField
        size="small"
        label={
          <Typography sx={{ mt: "3px" }} variant="subtitle2">
            Enter HQ address
          </Typography>
        }
        error={Boolean(hqAddressError)}
        type="text"
        value={hqAddress}
        onChange={(e) => setHqAddress(e.target.value)}
        helperText={hqAddressError}
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              color="success"
              checked={isActive}
              onChange={() => setIsActive((prev) => !prev)}
            />
          }
          label="Is active"
        />
      </FormGroup>
      <Button
        size="small"
        variant="contained"
        color="success"
        onClick={handleNewSeller}
      >
        Create
      </Button>
      <Button
        size="small"
        variant="contained"
        color="warning"
        onClick={() => {
          setOpen(false);
          setCompanyName("");
          setIsActive(true);
          setHqAddress("");
          setCompanyNameError("");
          setHqAddressError("");
        }}
      >
        Close
      </Button>
    </ModalTemplate>
  );
}

export default NewSellerModal;
