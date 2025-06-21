import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { addUser, resetAll } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "400px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Modal({ open, setOpen }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const dispatch = useDispatch();
  const { addLoader, data, addSuccess } = useSelector((state) => state.users);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    const data = {
      title,
      description,
      id: Date.now(),
    };
    dispatch(addUser(data));
  };

  useEffect(() => {
    if (addSuccess) {
      handleClose();
    }
    return () => {
      dispatch(resetAll());
    };
  }, [addSuccess]);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        // style={{width:'600px'}}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Product
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div>
            <TextField
              label="Title"
              id="outlined-size-small"
              size="small"
              value={title}
              onChange={(e) => {
                setTitle(e?.target.value);
              }}
              sx={{ margin: "10px", width: "250px" }}
            />
          </div>
          <div>
            <TextField
              label="Description"
              id="outlined-size-small"
              size="small"
              value={description}
              onChange={(e) => {
                setDescription(e?.target.value);
              }}
              sx={{ margin: "10px", width: "250px" }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleAdd}
            variant="contained"
            loading={addLoader}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
