import { ButtonBase, styled } from '@mui/material';
import React from 'react';

const Button = styled(ButtonBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.primary.main,
  borderRadius: '4pt',
  fontSize: '16pt',
  fontWeight: 'bold',
  padding: '16pt',
  width: '100%',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default function ButtonComponent({ text }: { text: string }) {
  return <Button>{text}</Button>;
}
