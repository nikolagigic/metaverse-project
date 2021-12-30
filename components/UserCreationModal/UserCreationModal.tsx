import { FC, useEffect, useState } from 'react';

import axios from 'axios';

import { Avatar, Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'white',
};

interface UserCreationModalProps {
    accountAddress: string;
    setOpenModal: (value: boolean) => void;
}

const UserCreationModal: FC<UserCreationModalProps> = ({ accountAddress, setOpenModal }) => {
  const [open, setOpen] = useState(false);
  const [formDetails, setFormDetails] = useState({
      username: '',
      address: accountAddress,
      description: ''
  })
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
      setOpen(false);
      setOpenModal(false);
  }

  useEffect(() => {
      handleOpen();
      setFormDetails({...formDetails, address: accountAddress});
  }, [])

  const handleCreate = () => {
    axios.post('http://localhost:3000/api/account', formDetails)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={style}>
            <Typography sx={{ marginBottom: 1 }} variant="h6" component="h2" align='center'>
                Create an Account
            </Typography>
            <Button>
                <Avatar sx={{ width: 256, height: 256, marginBottom: 2 }} />
            </Button>
            <TextField sx={{ marginBottom: 4 }} label="Username" variant="standard" onChange={(e) => setFormDetails({...formDetails, username: e.target.value})} />
            <TextField multiline label="Description" variant="outlined" rows={5} onChange={(e) => setFormDetails({...formDetails, description: e.target.value})} />
            <Button sx={{ width: 128, margin: 'auto', marginTop: 4, }} variant='contained' onClick={handleCreate}>Create</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default UserCreationModal;