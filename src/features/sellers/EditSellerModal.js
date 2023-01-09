import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ModalTemplate from "../../components/ModalTemplate";
import useSnack from "../../hooks/useSnacks";
import { editSeller, selectSellersById } from "./sellersSlice";

function EditSellerModal({ open, setOpen, path }) {
  const [companyName, setCompanyName] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [hqAddress, setHqAddress] = useState("");
  const [hqAddressError, setHqAddressError] = useState("");
  const [isActive, setIsActive] = useState(true);
  const { id } = useParams();
  const selectedSeller = useSelector((state) => selectSellersById(state, id));
  const activateSnack = useSnack();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedSeller) {
      setCompanyName(selectedSeller.companyName);
      setHqAddress(selectedSeller.hqAddress);
      setIsActive(selectedSeller.isActive);
      setCompanyNameError("");
      setHqAddressError("");
    }
  }, [selectedSeller]);

  function handleEdit() {
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
          editSeller({
            id: Number(id),
            updates: {
              companyName,
              isActive,
              hqAddress,
            },
          })
        );
        activateSnack("success", "Seller edited");
        setOpen(false);
        setCompanyName("");
        setIsActive(true);
        setHqAddress("");
        navigate(path);
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
            Enter name
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
            Enter surname
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
          setCompanyName("");
          setIsActive(true);
          setHqAddress("");
          setCompanyNameError("");
          setHqAddressError("");
          navigate(path);
        }}
      >
        Close
      </Button>
    </ModalTemplate>
  );
}

export default EditSellerModal;
