'use client';
import React, { useEffect, useState } from 'react';
import UsersList from './ui/UsersList';
import TablesList from './ui/TablesList';
import { Box, Grid, Typography } from '@mui/material';
import { ValidBarChart3D } from './ui/ValidBarChart3D';
import { TotalBarChart3D } from './ui/TotalBarChart3D';
import { getTotals, TotalsType } from '../actions/tables';
import io from 'socket.io-client';
import { Suspense } from 'react';
//const socketHost = process.env.NEXT_PUBLIC_WS_HOST_TABLES;
const socketHost = 'ws://localhost:9002';

//search Params

export default function adminAppPage({ searchParams }: { searchParams: any }) {
  const { searchTerm } = searchParams;
  const [totals, setTotals] = useState({
    totalEmitted: 0,
    totalValidated: 0,
    participationPercentage: 0,
    ojeda: 0,
    castro: 0,
    abasolo: 0,
    blanks: 0,
    nulls: 0,
  });

  useEffect(() => {

    console.log('try to conecct WS-TABLES from from  adminAppPage: ', socketHost);
    const socket = io(socketHost);

    const fetchTotals = async () => {
      const data = await getTotals();

      console.log('data', data);

      setTotals({
        totalEmitted: data.totalEmitted,
        totalValidated: data.totalValidated,
        participationPercentage: parseInt(data.participationPercentage),
        ojeda: data.ojeda,
        castro: data.castro,
        abasolo: data.abasolo,
        blanks: data.blanks,
        nulls: data.nulls,
      });
    };

    fetchTotals();
    
    socket.on('connect', () => {
      console.log('Try to connnect to WS-TABLES from  adminAppPage: ', socketHost);
    });
    socket.on('updateTables', (data) => {
      fetchTotals();
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  //const totals: TotalsType = await getTotals();

  return (
    <>
      <Box mx={1}>
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: 2,
            display: 'flex',
            mb: 1,
          }}
        >
          <Typography fontSize={20} gutterBottom mr={2}>
            <strong>Votos emitidos: </strong>
            {totals.totalEmitted}
          </Typography>
          <Typography fontSize={20} gutterBottom mr={2}>
            <strong>Votos válidos: </strong>
            {totals.totalValidated}
          </Typography>
          <Typography fontSize={20} gutterBottom>
            <strong>Participación: </strong>
            {totals.participationPercentage} %
          </Typography>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: 2,
                  }}
                >
                  <Typography fontSize={16} gutterBottom>
                    <strong>Resultados</strong>
                  </Typography>
                  <Typography fontSize={12} gutterBottom lineHeight={0.3}>
                    votos validamente emitidos
                  </Typography>
                  <Suspense fallback={<div>Loading...</div>}>
                    <ValidBarChart3D />
                  </Suspense>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: 2,
                  }}
                >
                  <Typography fontSize={16} gutterBottom>
                    <strong>Resultados</strong>
                  </Typography>
                  <Typography fontSize={12} gutterBottom lineHeight={0.3}>
                    votos Totales emitidos
                  </Typography>

                  <TotalBarChart3D
                    ojeda={totals.ojeda}
                    castro={totals.castro}
                    abasolo={totals.abasolo}
                    blanks={totals.blanks}
                    nulls={totals.nulls}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TablesList searchTerm={searchTerm} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
