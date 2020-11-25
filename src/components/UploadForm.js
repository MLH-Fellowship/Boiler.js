import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";

export default function UploadForm({ setBoilers, boilers }) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({ commands: [] });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    handleClose();
    console.log(values);
    await fetch(`http://localhost:5000/boilers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    const res = await fetch("http://localhost:5000/boilers");
    const parseRes = await res.json();
    setBoilers(parseRes);
  };

  return (
    <div>
      <Button color="secondary" variant="contained" onClick={handleClickOpen} type="submit" style={{ margin: '1em' }}>
        <AddIcon /> New Boiler
      </Button>
      <form action="/" method="POST" onSubmit={(e) => { e.preventDefault(); alert("Submitted form!"); handleClose(); }}>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Boiler</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add a new Boiler from any publically available GitHub repo.
          </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Name"
              onChange={(e) => { setValues({ ...values, [e.target.id]: e.target.value }) }}
              fullWidth
              variant="outlined" 
            />
            <TextField
              required
              margin="dense"
              id="type"
              label="Type"
              onChange={(e) => { setValues({ ...values, [e.target.id]: e.target.value }) }}
              fullWidth
              variant="outlined" 
            />
            <TextField
              required
              multiline
              margin="dense"
              id="description"
              label="Description"
              onChange={(e) => { setValues({ ...values, [e.target.id]: e.target.value }) }}
              fullWidth
              variant="outlined" 
            />
            <TextField
              required
              margin="dense"
              id="repo"
              label="Link"
              onChange={(e) => { setValues({ ...values, [e.target.id]: e.target.value }) }}
              fullWidth
              variant="outlined" 
            />
            <TextField
              required
              margin="dense"
              id="commands"
              label="Commands"
              helperText="Enter it as a comma separated list, ie: cd frontend, npm i, cd .."
              onChange={(e) => { setValues({ ...values, [e.target.id]: e.target.value }) }}
              fullWidth
              variant="outlined" 
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={handleCreate} color="primary" variant="contained">
              Create
          </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}