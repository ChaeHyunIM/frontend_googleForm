import { useAppSelector } from '../../app/hooks';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TitleBox from '../../components/FormTitle/TitleBox';
import PreviewQuestion from '../../components/Question/Preview';
import Button from '@mui/material/Button';

export default function Preview() {
  const formFields = useAppSelector(state => state.formField);
  const formHeader = useAppSelector(state => state.formHeader);

  return (
    <Stack>
      <TitleBox>
        <Stack spacing={1}>
          <Typography sx={{ fontSize: '36px', fontWeight: 500 }}>{formHeader.title}</Typography>
          {formHeader.description && <Typography sx={{ fontSize: '16px' }}>{formHeader.description}</Typography>}
        </Stack>
      </TitleBox>
      <Stack spacing={4}>
        {formFields.map(field => {
          return <PreviewQuestion id={field.id} key={field.id} />;
        })}
      </Stack>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Button variant="contained">제출</Button>
        <Button variant="outlined">양식 지우기</Button>
      </Stack>
    </Stack>
  );
}
