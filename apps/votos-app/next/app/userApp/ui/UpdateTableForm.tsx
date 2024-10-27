'use client'; // Indica que este componente es un Client Component

import React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { updateVotes, UpdateVotesProps } from '@/app/actions/tables';
import { useRouter } from 'next/navigation';

interface UpdateTableFormProps {
  tableId: number;
  initialData: {
    ojeda: number;
    castro: number;
    abasolo: number;
    blanks: number;
    nulls: number;
  };
}

export default function UpdateTablesForm({
  tableId,
  initialData,
}: UpdateTableFormProps) {
  const router = useRouter();

    
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const updateTable: UpdateVotesProps = {
      id: tableId,
      ojeda: parseInt(e.target.ojeda.value),
      castro: parseInt(e.target.castro.value),
      abasolo: parseInt(e.target.abasolo.value),
      blanks: parseInt(e.target.blanks.value),
      nulls: parseInt(e.target.nulls.value),
    };

    console.log('updateTable', updateTable);
    const update =  await updateVotes(updateTable);
    console.log('update', update);
    router.push('/');
  };
  return (
    <>
      <form
        onSubmit={(e) => {handleSubmit(e)}}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Ojeda"
              name="ojeda"
              type="number"
              variant="outlined"
              defaultValue={initialData.ojeda}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Castro"
              name="castro"
              type="number"
              variant="outlined"
              defaultValue={initialData.castro}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Abasolo"
              name="abasolo"
              type="number"
              variant="outlined"
              defaultValue={initialData.abasolo}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Votos en blanco"
              name="blanks"
              type="number"
              variant="outlined"
              defaultValue={initialData.blanks}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Votos nulos"
              name="nulls"
              type="number"
              variant="outlined"
              defaultValue={initialData.nulls}
            />
          </Grid>
          <Grid item xs={12} textAlign={'right'}>
            <Button variant="contained" color="primary" type="submit">
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
