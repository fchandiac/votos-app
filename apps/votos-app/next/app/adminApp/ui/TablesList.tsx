'use client';
import 'dotenv/config';
import { useEffect, useState } from 'react';
import { TableType, findAllTables } from '@/app/actions/tables';
import EditIcon from '@mui/icons-material/Edit';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import SearchTermInput from './SearchTermInput';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import MoreaTableButton from './MoreTableButton';
import { findAllUsers } from '@/app/actions/auth';
import EditTableButton from './EditTableButton';
import ResetTableButton from './ResetTableButton';

//const socketHost = 'ws://localhost:9002';
import io from 'socket.io-client';

const socketHost = process.env.NEXT_PUBLIC_WS_HOST_TABLES;
const userWS = process.env.NEXT_PUBLIC_WS_HOST;




export default function TablesList(searchTerm: any) {
  //@ts-ignore
  const [tables, setTables] = useState([]);
  const [users, setUsers] = useState([]);


  const fetchTables = async () => {
    const tablesData: any = await findAllTables(searchTerm.searchTerm);
    setTables(tablesData);
  };
  const fetchUsers = async () => {
    const usersData: any = await findAllUsers();
    setUsers(usersData);
  };

  useEffect(() => {
    console.log('UPDATE USER');
    const userSocket = io(userWS);
    userSocket.on('updateUser', (data: any) => {
      console.log('Actualizando mesas');
      fetchTables();
      fetchUsers();
    });

    //Cleanup para desconectar el socket al desmontar el componente
    return () => {
      userSocket.disconnect();
    };
  }, [])






  useEffect(() => {

    console.log('try to conecct WS-TABLES from TablesLIst', socketHost);

    const socket = io(socketHost);

    socket.on('connect', () => {
      console.log('Successfully connected to WS-TABLES from TablesList');
    });


    fetchTables();
    fetchUsers();

    socket.on('updateTables', (data: any) => {
      console.log('Actualizando mesas');
      fetchTables();
      fetchUsers();
    });

    //Cleanup para desconectar el socket al desmontar el componente
    return () => {
      socket.disconnect();
    };
  }, [searchTerm]);

  const totalOjeda = tables.reduce(
    (acc: any, table: { ojeda: any }) => acc + (table.ojeda || 0),
    0,
  );
  const totalAbasolo = tables.reduce(
    (acc: any, table: { abasolo: any }) => acc + (table.abasolo || 0),
    0,
  );
  const totalCastro = tables.reduce(
    (acc: any, table: { castro: any }) => acc + (table.castro || 0),
    0,
  );
  const totalBlancos = tables.reduce(
    (acc: any, table: { blanks: any }) => acc + (table.blanks || 0),
    0,
  );
  const totalNulos = tables.reduce(
    (acc: any, table: { nulls: any }) => acc + (table.nulls || 0),
    0,
  );

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
      <TableContainer
        sx={{
          border: '1px solid #ccc', // Borde de 1px
          boxShadow: 2, // Sombra para mejorar el efecto visual
          maxHeight: '85vh',
          backgroundColor: 'transparent',
          borderRadius: '8px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{ padding: '10px', width: '100%' }}
            fontSize={16}
            gutterBottom
          >
            <strong>Resultados por mesa</strong>
          </Typography>
          <SearchTermInput />
        </Box>

        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: 10,
                  backgroundColor: 'lightgray',
                  borderBottom: '1px solid lightgray',
                }}
              >
                Online
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 10,
                  backgroundColor: 'lightgray',
                  borderBottom: '1px solid lightgray',
                }}
              >
                Nro
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 10,
                  backgroundColor: 'lightgray',
                  borderBottom: '1px solid lightgray',
                }}
              >
                Ojeda
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 10,
                  backgroundColor: 'lightgray',
                  borderBottom: '1px solid lightgray',
                }}
              >
                Castro
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 10,
                  backgroundColor: 'lightgray',
                  borderBottom: '1px solid lightgray',
                }}
              >
                Abasolo
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 10,
                  backgroundColor: 'lightgray',
                  borderBottom: '1px solid lightgray',
                }}
              >
                Blancos
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 10,
                  backgroundColor: 'lightgray',
                  borderBottom: '1px solid lightgray',
                }}
              >
                Nulos
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 10,
                  backgroundColor: 'lightgray',
                  borderBottom: '1px solid lightgray',
                }}
              >
                Local
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 10,
                  backgroundColor: 'lightgray',
                  borderBottom: '1px solid lightgray',
                }}
              >
                Apoderado
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 10,
                  backgroundColor: 'lightgray',
                  borderBottom: '1px solid lightgray',
                }}
              >
                {''}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tables.map((table: TableType) => (
              <TableRow
                key={table.id}
                sx={{
                  backgroundColor: isTableNull(table)
                    ? 'transparent'
                    : '#aed581',
                }}
              >
                <TableCell
                  sx={{
                    fontSize: 9,
                    py: 0,
                    borderBottom: '1px solid lightgray',
                  }}
                >
                  <div
                    style={{
                      width: '10px', // Ajusta el tamaño del círculo
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: table.user.isOnline ? 'green' : 'red', // Verde si está en línea, rojo si no
                      marginRight: '5px', // Espaciado entre el círculo y el texto
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 9,
                    py: 0,
                    borderBottom: '1px solid lightgray',
                  }}
                >
                  {table.number}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 9,
                    py: 0,
                    borderBottom: '1px solid lightgray',
                  }}
                >
                  {table.ojeda}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 9,
                    py: 0,
                    borderBottom: '1px solid lightgray',
                  }}
                >
                  {table.castro}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 9,
                    py: 0,
                    borderBottom: '1px solid lightgray',
                  }}
                >
                  {table.abasolo}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 9,
                    py: 0,
                    borderBottom: '1px solid lightgray',
                  }}
                >
                  {table.blanks}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 9,
                    py: 0,
                    borderBottom: '1px solid lightgray',
                  }}
                >
                  {table.nulls}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 9,
                    py: 0,
                    borderBottom: '1px solid lightgray',
                  }}
                >
                  {table.place.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 9,
                    py: 0,
                    borderBottom: '1px solid lightgray',
                  }}
                >
                  {table.user.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 9,
                    py: 0,
                    borderBottom: '1px solid lightgray',
                  }}
                >
                  <Box display={'flex'}>
                    <MoreaTableButton
                      tableId={table.id}
                      number={table.number ?? 0}
                      userId={table.userId ?? 0}
                      users={users}
                    />
                    {/* <EditTableButton /> */}
                    <ResetTableButton id={table.id} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow
              sx={{
                backgroundColor: 'lightgray',
              }}
            >
              {/* Celda vacía para mantener la alineación */}
              <TableCell
                sx={{
                  fontSize: 9,
                  backgroundColor: 'lightgray',
                  position: 'sticky',
                  bottom: 0,
                }}
              ></TableCell>{' '}
              <TableCell
                sx={{
                  fontSize: 9,
                  fontWeight: 'bold',
                  backgroundColor: 'lightgray',
                  position: 'sticky',
                  bottom: 0,
                }}
              >
                Totales
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 9,
                  backgroundColor: 'lightgray',
                  position: 'sticky',
                  bottom: 0,
                }}
              >
                {totalOjeda}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 9,
                  backgroundColor: 'lightgray',
                  position: 'sticky',
                  bottom: 0,
                }}
              >
                {totalCastro}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 9,
                  backgroundColor: 'lightgray',
                  position: 'sticky',
                  bottom: 0,
                }}
              >
                {totalAbasolo}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 9,
                  backgroundColor: 'lightgray',
                  position: 'sticky',
                  bottom: 0,
                }}
              >
                {totalBlancos}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 9,
                  backgroundColor: 'lightgray',
                  position: 'sticky',
                  bottom: 0,
                }}
              >
                {totalNulos}
              </TableCell>
              {/* Celda vacía para mantener la alineación */}
              <TableCell
                sx={{
                  fontSize: 9,
                  backgroundColor: 'lightgray',
                  position: 'sticky',
                  bottom: 0,
                }}
              ></TableCell>
              {/* Celda vacía para mantener la alineación */}
              <TableCell
                sx={{
                  fontSize: 9,
                  backgroundColor: 'lightgray',
                  position: 'sticky',
                  bottom: 0,
                }}
              ></TableCell>
              <TableCell
                sx={{
                  fontSize: 9,
                  backgroundColor: 'lightgray',
                  position: 'sticky',
                  bottom: 0,
                }}
              ></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
