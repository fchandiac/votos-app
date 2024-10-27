import React from 'react';
import { findAllByUser } from '@/app/actions/tables';
import { Box, Grid, Typography } from '@mui/material';
import UpdateTablesForm from './UpdateTableForm';
import { TableType } from '@/app/actions/tables';

export default async function TablesList() {
  const tables = await findAllByUser();

  const isTableNull = (table: TableType) => {
    if (
      table.ojeda === 0 &&
      table.castro === 0 &&
      table.abasolo === 0 &&
      table.blanks === 0 &&
      table.nulls === 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <Grid container spacing={1} p={1}>
        {tables.map((table) => (
          <Grid item xs={12} sm={2}>
            <Box
              key={table.id}
              sx={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: 2,
                marginBottom: '16px',
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography align="left" fontSize={16}>
                    <strong> Mesa: {table.number}</strong>
                  </Typography>
                  <Typography align="left" fontSize={10} lineHeight={0.5}>
                    estado:{' '}
                    {isTableNull(table) ? 'pendiente' : 'datos enviados'}
                  </Typography>
                </Grid>
                {isTableNull(table) && (
                  <Grid item xs={12}>
                    <UpdateTablesForm
                      tableId={table.id}
                      initialData={{
                        ojeda: table.ojeda,
                        castro: table.castro,
                        abasolo: table.abasolo,
                        blanks: table.blanks,
                        nulls: table.nulls,
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
