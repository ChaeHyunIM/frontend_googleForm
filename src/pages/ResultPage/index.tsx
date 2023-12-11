import Grid from '@mui/material/Grid';
import { useAppSelector } from '../../app/hooks';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

export default function ResultPage() {
  const formFields = useAppSelector(state => state.formField);
  const formResponse = useAppSelector(state => state.formResponse);
  const formHeader = useAppSelector(state => state.formHeader);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
    },
    {
      field: 'type',
      headerName: '타입',
      width: 150,
    },
    {
      field: 'label',
      headerName: '질문',
      width: 150,
    },
    {
      field: 'response',
      headerName: '답변',
      width: 150,
    },
  ];

  const rows = formFields.map(field => {
    return {
      id: field.id,
      type: field.type,
      label: field.label,
      response: formResponse[field.id],
    };
  });

  return (
    <Grid container justifyContent={'center'} alignItems={'center'} sx={{ height: '100vh' }}>
      <Grid item xs={10}>
        <Typography variant="h4" sx={{ py: '10px' }}>
          {formHeader.title}
        </Typography>
        <Typography variant="h5" sx={{ py: '10px' }}>
          {formHeader.description}
        </Typography>
        <DataGrid rows={rows} columns={columns} />
      </Grid>
    </Grid>
  );
}
