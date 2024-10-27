'use client';
import React from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { IconButton } from '@mui/material';
import { resetTable } from '../../actions/tables';

interface ResetTableButtonProps {
  id: number;
}

export default function ResetTableButton({ id }: ResetTableButtonProps) {
  const handleRestartTable = async () => {
    await resetTable(id);
  };

  return (
    <>
      <IconButton onClick={() => handleRestartTable()}>
        <RestartAltIcon />
      </IconButton>
    </>
  );
}
