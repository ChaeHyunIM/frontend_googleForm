import { useAppSelector } from '../../app/hooks';
import { DataGrid } from '@mui/x-data-grid';

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
    <div>
      <h1>{formHeader.title}</h1>
      <h2>{formHeader.description}</h2>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
