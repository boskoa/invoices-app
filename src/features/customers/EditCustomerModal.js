import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ModalTemplate from "../../components/ModalTemplate";
import useSnack from "../../hooks/useSnacks";
import { allLetters, isValidAge } from "../../utils/validators";
import { editCustomer, selectCustomerById } from "../customers/customersSlice";

function EditCustomerModal({ open, setOpen, path }) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [surname, setSurname] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const { id } = useParams();
  const selectedCustomer = useSelector((state) =>
    selectCustomerById(state, id)
  );
  const activateSnack = useSnack();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCustomer) {
      setName(selectedCustomer.name);
      setSurname(selectedCustomer.surname);
      setAge(selectedCustomer.age);
      setAddress(selectedCustomer.address);
      setNameError("");
      setSurnameError("");
      setAgeError("");
      setAddressError("");
    }
  }, [selectedCustomer]);

  function handleEdit() {
    if (
      !allLetters(name) ||
      !allLetters(surname) ||
      !isValidAge(age) ||
      !address.length
    ) {
      if (!allLetters(name)) {
        setNameError("Use only letters");
      }
      if (!allLetters(name)) {
        setSurnameError("Use only letters");
      }
      if (!isValidAge(age)) {
        setAgeError("Not allowed");
      }
      if (!address.length) {
        setAddressError("Address is mandatory");
      }
    } else {
      try {
        dispatch(
          editCustomer({
            id: Number(id),
            updates: {
              name,
              surname,
              age: Number(age),
              address,
            },
          })
        );
        activateSnack("success", "Customer edited");
        setOpen(false);
        setName("");
        setSurname("");
        setAge("");
        setAddress("");
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
        error={Boolean(nameError)}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        helperText={nameError}
      />
      <TextField
        size="small"
        label={
          <Typography sx={{ mt: "3px" }} variant="subtitle2">
            Enter surname
          </Typography>
        }
        error={Boolean(surnameError)}
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        helperText={surnameError}
      />
      <TextField
        size="small"
        label={
          <Typography sx={{ mt: "3px" }} variant="subtitle2">
            Enter age
          </Typography>
        }
        error={Boolean(ageError)}
        type="text"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        helperText={ageError}
      />
      <TextField
        size="small"
        label={
          <Typography sx={{ mt: "3px" }} variant="subtitle2">
            Enter address
          </Typography>
        }
        error={Boolean(addressError)}
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        helperText={addressError}
      />
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
          setName("");
          setSurname("");
          setAge("");
          setAddress("");
          setNameError("");
          setSurnameError("");
          setAgeError("");
          setAddressError("");
          navigate(path);
        }}
      >
        Close
      </Button>
    </ModalTemplate>
  );
}

export default EditCustomerModal;
