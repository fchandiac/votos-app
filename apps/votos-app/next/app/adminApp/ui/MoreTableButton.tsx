'use client';
import {
  Box,
  Dialog,
  IconButton,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';

interface MoreaTableButtonProps {
  users: any[];
  tableId: number;
  number: number;
  userId: number;
}

import { updateUser } from '@/app/actions/tables';

export default function MoreaTableButton({
  tableId,
  number,
  userId,
  users,
}: MoreaTableButtonProps) {
  const [openMoreDialog, setOpenMoreDialog] = React.useState(false);
  const  [selectedUser, setSelectedUser] = React.useState(userId);

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUser(tableId, selectedUser);
    setOpenMoreDialog(false);
  }

  return (
    <>
      <IconButton
        aria-label="edit"
        size="small"
        onClick={() => setOpenMoreDialog(true)}
      >
        <PersonIcon />
      </IconButton>

      <Dialog
        open={openMoreDialog}
        onClose={() => setOpenMoreDialog(false)}
        fullWidth
      >
        <Box p={1}>
          <Typography variant="h5" align="left" pb={2}>
            <strong> Mesa: {number}</strong>
          </Typography>
          <Typography variant="subtitle1" align="left" pb={2}>
            Actualizar apoderado
          </Typography>
          <form
            onSubmit={handleUpdateUser}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Grid container spacing={2} direction={'column'}>
              <Grid item>
                <FormControl fullWidth>
                  <InputLabel id="select-user">Apoderado</InputLabel>
                  <Select
                    labelId="select-user"
                    id="select-user"
                    value={selectedUser}
                    defaultValue={userId}
                    // onChange={(e) => setUserId(e.target.value)}
                    label="Apoderado"
                    onChange={(e) => {
                      // console.log('e.target.value', e.target.value);
                      //@ts-ignore
                      setSelectedUser(e.target.value);
                      
                    }}
                  >
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item textAlign={'right'}>
                <Button variant="contained" color="primary" type="submit">
                  Actualizar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Dialog>
    </>
  );
}
