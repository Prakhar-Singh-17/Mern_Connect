import {React} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  display : "flex",
  flexDirection : "column",
  gap : "1rem",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius : "10px",
  boxShadow: 24,
  p: 4,
};

export default function CodeModal() {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <CloseIcon/>
          <h5 align="center">Please Input Meeting Code</h5>
          <TextField id="outlined-basic" label="Code" variant="outlined" />
          <Button variant="contained">Join / Create</Button>
        </Box>
      </Modal>
    </div>
  );
}
